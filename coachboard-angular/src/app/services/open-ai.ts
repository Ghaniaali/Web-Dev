import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

export interface MealItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface MealPlan {
  breakfast: MealItem;
  lunch: MealItem;
  dinner: MealItem;
  snacks: MealItem[];
  totalCalories: number;
  totalProtein: number;
}

// ============================================================
// GEMINI API KEY
// ============================================================
//
// IMPORTANT:
// Replace this with your NEW Gemini API key.
//
// Do NOT use the API key that was previously exposed.
//
// For production applications, the API key should be kept
// on a backend server instead of inside Angular.
// ============================================================

const GEMINI_KEY = 'AQ.Ab8RN6LuNDD0Mac6o08r1065VYI44kPDSt0J78h_7Jh28HwqsA';


@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  // ============================================================
  // PUBLIC METHOD
  // ============================================================
  //
  // Your existing meal-plan component can continue calling:
  //
  // this.openAiService.generateMealPlan(...)
  //
  // No changes are required in meal-plan.ts.
  // ============================================================

  generateMealPlan(
    clientName: string,
    goal: string,
    calories: number,
    restrictions: string[]
  ): Observable<MealPlan> {

    return from(
      this.callGemini(
        clientName,
        goal,
        calories,
        restrictions
      )
    );
  }


  // ============================================================
  // GEMINI INTERACTIONS API
  // ============================================================

  private async callGemini(
    clientName: string,
    goal: string,
    calories: number,
    restrictions: string[]
  ): Promise<MealPlan> {

    // Current Gemini Interactions API endpoint.
    const url =
      'https://generativelanguage.googleapis.com/v1beta/interactions';


    // ============================================================
    // DIET RESTRICTIONS
    // ============================================================

    const diet =
      restrictions && restrictions.length > 0
        ? restrictions.join(', ')
        : 'none';


    // ============================================================
    // PROMPT
    // ============================================================

    const prompt = `
You are a professional nutritionist.

Create a personalized daily meal plan for the following client.

Client name: ${clientName}
Goal: ${goal}
Daily calorie target: ${calories}
Diet restrictions: ${diet}

IMPORTANT REQUIREMENTS:

1. Create breakfast, lunch, dinner, and snacks.
2. Respect the client's dietary restrictions.
3. Keep the total daily calories close to the requested calorie target.
4. Provide realistic calorie and macronutrient values.
5. Protein, carbohydrates, and fats must be numeric values.
6. totalCalories must represent the approximate sum of all meals.
7. totalProtein must represent the approximate total protein.
8. Return ONLY the requested JSON structure.
9. Do not add explanations.
10. Do not use Markdown.
`;


    // ============================================================
    // JSON SCHEMA
    // ============================================================
    //
    // This tells Gemini exactly what structure we expect.
    //
    // This is better than simply asking the model:
    // "Please give me JSON."
    //
    // The Interactions API supports structured JSON output.
    // ============================================================

    const mealPlanSchema = {

      type: 'object',

      properties: {

        breakfast: {
          type: 'object',

          properties: {

            name: {
              type: 'string'
            },

            calories: {
              type: 'number'
            },

            protein: {
              type: 'number'
            },

            carbs: {
              type: 'number'
            },

            fats: {
              type: 'number'
            }

          },

          required: [
            'name',
            'calories',
            'protein',
            'carbs',
            'fats'
          ]
        },


        lunch: {
          type: 'object',

          properties: {

            name: {
              type: 'string'
            },

            calories: {
              type: 'number'
            },

            protein: {
              type: 'number'
            },

            carbs: {
              type: 'number'
            },

            fats: {
              type: 'number'
            }

          },

          required: [
            'name',
            'calories',
            'protein',
            'carbs',
            'fats'
          ]
        },


        dinner: {
          type: 'object',

          properties: {

            name: {
              type: 'string'
            },

            calories: {
              type: 'number'
            },

            protein: {
              type: 'number'
            },

            carbs: {
              type: 'number'
            },

            fats: {
              type: 'number'
            }

          },

          required: [
            'name',
            'calories',
            'protein',
            'carbs',
            'fats'
          ]
        },


        snacks: {
          type: 'array',

          items: {

            type: 'object',

            properties: {

              name: {
                type: 'string'
              },

              calories: {
                type: 'number'
              },

              protein: {
                type: 'number'
              },

              carbs: {
                type: 'number'
              },

              fats: {
                type: 'number'
              }

            },

            required: [
              'name',
              'calories',
              'protein',
              'carbs',
              'fats'
            ]
          }
        },


        totalCalories: {
          type: 'number'
        },


        totalProtein: {
          type: 'number'
        }

      },


      required: [
        'breakfast',
        'lunch',
        'dinner',
        'snacks',
        'totalCalories',
        'totalProtein'
      ]
    };


    // ============================================================
    // REQUEST
    // ============================================================

    const requestBody = {

      // Current model.
      model: 'gemini-3.5-flash-lite',

      // Prompt sent to Gemini.
      input: prompt,

      // Tell Gemini that we want structured JSON.
      response_format: {
        type: 'text',
        mime_type: 'application/json',
        schema: mealPlanSchema
      }

    };


    // ============================================================
    // SEND REQUEST
    // ============================================================

    const res = await fetch(url, {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

        // Gemini API authentication.
        'x-goog-api-key': GEMINI_KEY

      },

      body: JSON.stringify(requestBody)

    });


    // ============================================================
    // HANDLE API ERRORS
    // ============================================================

    if (!res.ok) {

      let errorMessage =
        `Gemini API Error ${res.status}`;

      try {

        const errorData = await res.json();

        errorMessage =
          errorData?.error?.message ||
          errorData?.message ||
          errorMessage;

      } catch {

        // Keep default error message.
      }

      console.error(
        'Gemini API Error:',
        errorMessage
      );

      throw new Error(errorMessage);
    }


    // ============================================================
    // READ RESPONSE
    // ============================================================

    const data = await res.json();

    console.log(
      'Gemini Interaction Response:',
      data
    );


    // ============================================================
    // GET MODEL OUTPUT
    // ============================================================
    //
    // The Interactions API returns generated content inside
    // the interaction's outputs.
    //
    // We search for the model_output step and then extract
    // its text.
    // ============================================================

    let raw = '';


    if (Array.isArray(data?.outputs)) {

      for (const output of data.outputs) {

        if (
          output?.type === 'text' &&
          typeof output?.text === 'string'
        ) {

          raw = output.text;
          break;
        }
      }
    }


    // Some API responses expose the generated text through
    // the steps array instead.
    if (
      !raw &&
      Array.isArray(data?.steps)
    ) {

      for (const step of data.steps) {

        if (
          step?.type === 'model_output' &&
          Array.isArray(step?.content)
        ) {

          for (const content of step.content) {

            if (
              content?.type === 'text' &&
              typeof content?.text === 'string'
            ) {

              raw = content.text;
              break;
            }
          }
        }

        if (raw) {
          break;
        }
      }
    }


    // ============================================================
    // VALIDATE RESPONSE
    // ============================================================

    if (!raw) {

      console.error(
        'Unexpected Gemini response:',
        data
      );

      throw new Error(
        'Gemini returned an empty response. Please try again.'
      );
    }


    raw = raw.trim();


    // ============================================================
    // PARSE JSON
    // ============================================================

    try {

      const mealPlan =
        JSON.parse(raw) as MealPlan;

      return mealPlan;

    } catch (error) {

      console.error(
        'Could not parse Gemini JSON:',
        raw
      );

      // ----------------------------------------------------------
      // FALLBACK
      // ----------------------------------------------------------
      //
      // This protects the application if the model somehow
      // returns additional characters around the JSON.
      // ----------------------------------------------------------

      const start =
        raw.indexOf('{');

      const end =
        raw.lastIndexOf('}');


      if (
        start !== -1 &&
        end !== -1 &&
        end > start
      ) {

        try {

          const jsonText =
            raw.substring(
              start,
              end + 1
            );

          return JSON.parse(
            jsonText
          ) as MealPlan;

        } catch {

          // Continue to final error.
        }
      }


      throw new Error(
        'Could not parse AI meal plan. Please try again.'
      );
    }
  }
}