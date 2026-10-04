import { FriendProfile, Recipe, MealPlanDay, GroceryItem, KitchenSafetyRule, OpenModelSpec } from '../types';

export const OPEN_MODELS: OpenModelSpec[] = [
  {
    id: 'gemma-2b-it',
    name: 'Gemma 2 2B (Instruct)',
    creator: 'Google DeepMind (Open Weights)',
    parameters: '2.6 Billion',
    contextWindow: '8k tokens',
    quantization: 'q4f16 (1.4 GB)',
    ramRequired: '~1.8 GB RAM',
    badge: 'On-Device Default',
    description: 'Ultra-efficient open model tuned for instruction following and factual safety checks. Runs completely offline inside the browser runtime.',
    whyChosen: 'Ideal for rapid ingredient parsing and dietary safety validation without taxing laptop battery or memory.'
  },
  {
    id: 'llama-3.2-1b',
    name: 'Llama 3.2 1B',
    creator: 'Meta AI (Open Weights)',
    parameters: '1.2 Billion',
    contextWindow: '128k tokens',
    quantization: 'q4_k_m (780 MB)',
    ramRequired: '~1.1 GB RAM',
    badge: 'Edge Lightning',
    description: 'Sub-1GB footprint model engineered specifically for mobile and edge on-device inference with fast latency.',
    whyChosen: 'Instantaneous response time in grocery store aisles with spotty connectivity.'
  },
  {
    id: 'smollm2-360m',
    name: 'SmolLM2 360M',
    creator: 'Hugging Face (Open Weights)',
    parameters: '360 Million',
    contextWindow: '4k tokens',
    quantization: 'int8 (380 MB)',
    ramRequired: '~500 MB RAM',
    badge: 'Micro Runtime',
    description: 'Extremely lightweight open model for constrained devices, microcontrollers, and zero-footprint environments.',
    whyChosen: 'Can run simultaneously alongside other apps on older roommate laptops.'
  },
  {
    id: 'mistral-7b-instruct',
    name: 'Mistral 7B Instruct v0.3',
    creator: 'Mistral AI (Apache 2.0)',
    parameters: '7.3 Billion',
    contextWindow: '32k tokens',
    quantization: 'q4_0 (4.1 GB)',
    ramRequired: '~5.5 GB RAM',
    badge: 'Deep Culinary Reasoning',
    description: 'Full-depth open weight model for complex cross-contamination substitution reasoning and week-long pantry optimization.',
    whyChosen: 'Generates gourmet restaurant-quality culinary adaptations for multi-allergy households.'
  }
];

export const FRIEND_PROFILES: FriendProfile[] = [
  {
    id: 'sam-roommate',
    name: 'Sam',
    relationship: 'Roommate & Best Friend (Apt 4B)',
    photoUrl: '/src/assets/images/avatar_friend_sam_1791048145948.jpg',
    avatarFallback: 'SM',
    primaryStory: 'Sam has severe Celiac Disease and life-threatening peanut/tree-nut anaphylaxis. In our shared apartment, cooking was constant stress: reading microscopic grocery labels, fearing crumbs in the toaster, and eating bland boiled rice just to be safe. SafePlate lets us cook real dinners together with 100% certainty.',
    allergiesOrConstraints: [
      {
        label: 'Celiac Disease (Strict Gluten-Free)',
        level: 'Severe (Anaphylaxis / Celiac)',
        note: 'Zero tolerance for wheat, barley, rye, malt, brewer’s yeast, or shared factory lines. Separate toaster mandatory.'
      },
      {
        label: 'Peanut & Tree Nut Anaphylaxis',
        level: 'Severe (Anaphylaxis / Celiac)',
        note: 'Carries EpiPen. No peanuts, almonds, walnuts, cashews, pesto with pine nuts, or nut oils.'
      },
      {
        label: 'Lactose Sensitivity',
        level: 'Moderate',
        note: 'Prefers oat milk (certified GF), coconut milk, or aged hard cheeses (parmesan is fine, no heavy cream).'
      }
    ],
    favoriteDishes: ['Mediterranean Lemon Herb Chicken', 'Coconut Chickpea Curry', 'Crispy Carnitas Tacos with Corn Tortillas'],
    quote: '“Dude, you actually made this for me?! Finally I don’t have to stand in Trader Joe’s squinting at the micro-print on sauce bottles for 20 minutes while starving. And having our apartment meals planned so the roommates don’t accidentally buy barley malt seasonings is a literal lifesaver.”',
    quoteAuthor: 'Sam, Apartment 4B Roommate'
  },
  {
    id: 'grandpa-joe',
    name: 'Grandpa Joe',
    relationship: 'Grandfather (82, Retired Carpenter)',
    photoUrl: '',
    avatarFallback: 'GJ',
    primaryStory: 'Grandpa Joe has decades of oral Italian family recipes memorized in his head, but his hands shake too much to type and he worries about big tech companies tracking his voice. He needed a tool to speak family recipes into, format them into an heirloom cookbook, and keep intimate family audio completely private on his home laptop.',
    allergiesOrConstraints: [
      {
        label: 'Low Sodium / Heart Health',
        level: 'Moderate',
        note: 'Doctor-ordered low-salt substitutes, fresh herbs (rosemary, basil, oregano) instead of table salt.'
      },
      {
        label: 'Kidney-Friendly Potassium Limits',
        level: 'Moderate',
        note: 'Moderate tomato paste concentration, soak potatoes before roasting.'
      }
    ],
    favoriteDishes: ['Sunday Slow-Braised Tomato Polenta', 'Tuscan White Bean & Escarole Soup', 'Lemon Herb Roasted Seabass'],
    quote: '“I don’t trust those Silicon Valley gadgets with my mother’s sauce recipe. Having this run right here on my old desk computer without sending my voice into some cloud makes me feel like family secrets stay in the family.”',
    quoteAuthor: 'Grandpa Joe'
  },
  {
    id: 'elena-student',
    name: 'Elena',
    relationship: 'Study Buddy & Exchange Student',
    photoUrl: '',
    avatarFallback: 'EL',
    primaryStory: 'Elena is preparing for her medical residency exam in a second language. She gets intense anxiety speaking with native tutors and study groups. She wanted a patient, non-judgmental conversational sparring partner that costs $0 and works on the subway commute with zero internet access.',
    allergiesOrConstraints: [
      {
        label: 'Low-Anxiety Safe Space',
        level: 'Preference',
        note: 'Gentle corrective feedback, zero timer pressure, phonetic breakdowns.'
      },
      {
        label: 'Offline Commuter Mode',
        level: 'Severe (Anaphylaxis / Celiac)',
        note: 'Must function entirely air-gapped on the morning metro line where cellular connection drops.'
      }
    ],
    favoriteDishes: ['Quick Study Fuel Porridge', 'Matcha Chia Seed Pudding', 'Spiced Lentil Dahl'],
    quote: '“Knowing this runs on my own MacBook without counting API pennies or reporting my hesitations to a cloud server let me practice for two hours every morning without fear.”',
    quoteAuthor: 'Elena'
  }
];

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    title: 'Lemon Herb Garlic Roasted Chicken & Crispy Potatoes',
    description: 'Crisp golden chicken thighs infused with rosemary, garlic, and fresh lemon zest, paired with Yukon Gold potatoes roasted until crackly.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 40,
    servings: 4,
    category: 'Dinner',
    safetyVerified: true,
    allergensFree: ['Gluten-Free', 'Nut-Free', 'Dairy-Free'],
    ingredients: [
      { name: 'Chicken Thighs (Bone-in, skin-on)', amount: '2 lbs', safeNote: 'Fresh butcher cut, no seasonings added' },
      { name: 'Yukon Gold Potatoes', amount: '1.5 lbs, quartered' },
      { name: 'Extra Virgin Olive Oil', amount: '3 tbsp', safeNote: 'Single-estate cold pressed' },
      { name: 'Fresh Rosemary & Thyme', amount: '2 tbsp finely chopped' },
      { name: 'Garlic Cloves', amount: '6 cloves, smashed' },
      { name: 'Fresh Lemon Juice & Zest', amount: '2 lemons' },
      { name: 'Coarse Sea Salt & Black Pepper', amount: 'To taste' }
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Thoroughly sanitize the kitchen counter and use a dedicated clean baking sheet.',
      'Toss quartered potatoes in 1.5 tbsp olive oil, half the rosemary, garlic, and sea salt. Spread onto one half of the sheet.',
      'Pat chicken thighs dry with clean paper towels. Rub with remaining olive oil, lemon zest, herbs, salt, and pepper.',
      'Place chicken skin-side up on the baking sheet.',
      'Roast for 38–42 minutes until skin is deeply golden and internal temperature reaches 165°F (74°C).',
      'Squeeze fresh lemon juice over everything and rest 5 minutes before serving with apartment roommates.'
    ],
    crossContaminationProtocol: [
      'Use dedicated non-wood cutting board (plastic/composite strictly sanitized).',
      'Never place raw chicken or gluten-containing bread on the prep surface.',
      'Use designated clean tongs not used for roommate toast.'
    ],
    image: '/src/assets/images/hero_safeplate_dish_1791048129513.jpg',
    storyNote: 'Sam’s favorite Friday night apartment feast. Guaranteed 0% gluten and 0% nuts.'
  },
  {
    id: 'rec-2',
    title: 'Thai Coconut Basil Chicken with Rice Noodles',
    description: 'Rich, fragrant coconut milk simmered with lemongrass, certified gluten-free tamari, tender chicken, and sweet Thai basil.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    servings: 3,
    category: 'Dinner',
    safetyVerified: true,
    allergensFree: ['Gluten-Free', 'Peanut-Free', 'Tree-Nut-Free', 'Dairy-Free'],
    ingredients: [
      { name: 'Rice Vermicelli Noodles', amount: '8 oz', safeNote: 'Certified 100% pure rice, GF facility' },
      { name: 'Boneless Skinless Chicken Breast', amount: '1 lb, sliced thinly' },
      { name: 'Full-Fat Coconut Milk', amount: '1 can (13.5 oz)', safeNote: 'Guar-gum free, nut-free facility' },
      { name: 'San-J Certified GF Tamari', amount: '3 tbsp', safeNote: 'Strictly Tamari, never standard wheat soy sauce' },
      { name: 'Red Bell Pepper & Baby Bok Choy', amount: '2 cups chopped' },
      { name: 'Fresh Thai Basil Leaves', amount: '1 cup packed' },
      { name: 'Fresh Ginger & Garlic', amount: '2 tbsp minced' }
    ],
    instructions: [
      'Soak rice noodles in warm water according to package directions; drain thoroughly.',
      'Heat 1 tbsp oil in a large skillet over medium-high heat. Add ginger and garlic, sauté 30 seconds until fragrant.',
      'Add sliced chicken and cook 5–6 minutes until lightly browned.',
      'Pour in coconut milk and certified gluten-free tamari. Simmer gently for 4 minutes.',
      'Fold in bell peppers and bok choy; cook 2 minutes until tender-crisp.',
      'Turn off heat, stir in fresh Thai basil leaves, and ladle over the prepared rice noodles.'
    ],
    crossContaminationProtocol: [
      'CRITICAL: Check Tamari label for "Certified Gluten-Free" seal. Regular soy sauce contains fermented wheat.',
      'Ensure wok/skillet has been thoroughly degreased and scrubbed with a clean dedicated sponge.'
    ],
    storyNote: 'Replaces the takeout Thai place that couldn’t guarantee nut cross-contact.'
  },
  {
    id: 'rec-3',
    title: 'Golden Turmeric Coconut Chickpea Stew with Spinach',
    description: 'Hearty, warming chickpeas slow-simmered in turmeric, ginger, and creamy coconut broth, finished with fresh baby spinach and lime.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    servings: 4,
    category: 'Lunch',
    safetyVerified: true,
    allergensFree: ['Gluten-Free', 'Nut-Free', 'Dairy-Free', 'Vegan'],
    ingredients: [
      { name: 'Cooked Chickpeas (Organic)', amount: '2 cans (15 oz each), rinsed' },
      { name: 'Full Fat Coconut Milk', amount: '1 can (13.5 oz)' },
      { name: 'Yellow Onion & Garlic', amount: '1 onion diced, 4 cloves garlic' },
      { name: 'Ground Turmeric & Cumin', amount: '1.5 tsp turmeric, 1 tsp cumin' },
      { name: 'Fresh Baby Spinach', amount: '4 cups packed' },
      { name: 'Lime Wedges & Jasmine Rice', amount: 'For serving' }
    ],
    instructions: [
      'Sauté diced onion and garlic in olive oil until soft and translucent.',
      'Add turmeric, ground cumin, and a pinch of chili flakes. Toast spices for 45 seconds.',
      'Add rinsed chickpeas and coconut milk. Lightly crush about 1/3 of the chickpeas with a wooden spoon for creamy texture.',
      'Simmer on medium-low for 15 minutes to let flavors meld.',
      'Stir in fresh baby spinach until wilted. Season with sea salt and fresh lime juice. Serve over steamed jasmine rice.'
    ],
    crossContaminationProtocol: [
      'Canned chickpeas must be checked for allergen facility notes.',
      'Use dedicated gluten-free wooden or silicone spoon.'
    ],
    storyNote: 'The ultimate apartment budget meal: costs under $3/serving and everyone loves it.'
  },
  {
    id: 'rec-4',
    title: 'Crispy Carnitas Tacos with Fresh Pico de Gallo',
    description: 'Slow-braised spiced pork shoulder crisped under the broiler, served on warm 100% white corn tortillas with avocado cilantro crema.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 35,
    servings: 4,
    category: 'Dinner',
    safetyVerified: true,
    allergensFree: ['Gluten-Free', 'Nut-Free', 'Dairy-Free option'],
    ingredients: [
      { name: 'Braised Pork Carnitas', amount: '1.5 lbs, shredded' },
      { name: '100% White Corn Tortillas', amount: '8 tortillas', safeNote: 'Certified GF corn tortillas, no wheat blend' },
      { name: 'Roma Tomatoes & Red Onion', amount: '3 diced tomatoes, 1/4 onion' },
      { name: 'Fresh Cilantro & Limes', amount: '1 bunch cilantro, 2 limes' },
      { name: 'Ripe Hass Avocados', amount: '2 avocados, mashed with lime & salt' }
    ],
    instructions: [
      'Spread shredded carnitas on a baking sheet and broil 3–5 minutes until edges are shatteringly crisp.',
      'Warm corn tortillas directly in a dry cast iron skillet (or wrap in foil in oven).',
      'Mix diced tomatoes, onion, cilantro, lime juice, and salt for the fresh pico.',
      'Layer crisp carnitas into warm tortillas, top with fresh avocado mash and pico de gallo.'
    ],
    crossContaminationProtocol: [
      'NEVER warm corn tortillas in the roommate toaster or on grill grates with flour tortilla residue.',
      'Clean cast iron pan thoroughly with hot water and designated brush.'
    ],
    storyNote: 'Friday night apartment taco bar. No flour tortillas allowed in the kitchen on taco night.'
  }
];

export const WEEKLY_MEAL_PLAN: MealPlanDay[] = [
  {
    day: 'Monday',
    dateStr: 'Oct 5',
    breakfast: {
      id: 'm-bf',
      title: 'Certified GF Rolled Oats with Chia & Blueberries',
      description: 'Slow cooked Bob’s Red Mill certified GF oats with cinnamon and fresh berries.',
      prepTimeMinutes: 5,
      cookTimeMinutes: 10,
      servings: 2,
      category: 'Breakfast',
      safetyVerified: true,
      allergensFree: ['Gluten-Free', 'Nut-Free', 'Dairy-Free'],
      ingredients: [{ name: 'Certified Gluten-Free Rolled Oats', amount: '1 cup' }],
      instructions: ['Cook oats with 2 cups water, top with berries.'],
      crossContaminationProtocol: ['Separate pot, GF oats only.']
    },
    lunch: INITIAL_RECIPES[2],
    dinner: INITIAL_RECIPES[0],
    snack: {
      id: 'm-sn',
      title: 'Crisp Apple Slices with Sunflower Butter',
      description: 'Safe alternative to peanut butter using pure roasted sunflower seeds.',
      prepTimeMinutes: 3,
      cookTimeMinutes: 0,
      servings: 1,
      category: 'Snack',
      safetyVerified: true,
      allergensFree: ['Nut-Free', 'Peanut-Free', 'Gluten-Free'],
      ingredients: [{ name: 'Organic SunButter', amount: '2 tbsp' }, { name: 'Honeycrisp Apple', amount: '1 sliced' }],
      instructions: ['Slice apple, serve with sunflower seed butter.'],
      crossContaminationProtocol: ['Verify SunButter is peanut-free facility certified.']
    }
  },
  {
    day: 'Tuesday',
    dateStr: 'Oct 6',
    breakfast: {
      id: 't-bf',
      title: 'Sunny Side Eggs with Avocado & Roasted Sweet Potato',
      description: 'Pasture-raised eggs cooked in olive oil with caramelized sweet potato cubes.',
      prepTimeMinutes: 10,
      cookTimeMinutes: 15,
      servings: 2,
      category: 'Breakfast',
      safetyVerified: true,
      allergensFree: ['Gluten-Free', 'Nut-Free', 'Dairy-Free'],
      ingredients: [{ name: 'Fresh Eggs', amount: '4 eggs' }, { name: 'Sweet Potato', amount: '1 cubed' }],
      instructions: ['Pan roast sweet potatoes, fry eggs sunny side up.'],
      crossContaminationProtocol: ['Use clean silicone spatula.']
    },
    lunch: INITIAL_RECIPES[0],
    dinner: INITIAL_RECIPES[1],
    snack: {
      id: 't-sn',
      title: 'Salted Rosemary Plantain Chips with Guacamole',
      description: 'Crisp artisan plantain chips in safe avocado oil.',
      prepTimeMinutes: 5,
      cookTimeMinutes: 0,
      servings: 2,
      category: 'Snack',
      safetyVerified: true,
      allergensFree: ['Gluten-Free', 'Nut-Free'],
      ingredients: [{ name: 'Artisan Plantain Chips', amount: '1 bag' }],
      instructions: ['Serve with fresh lime guacamole.'],
      crossContaminationProtocol: ['Check chips for shared facility warnings.']
    }
  },
  {
    day: 'Wednesday',
    dateStr: 'Oct 7',
    breakfast: {
      id: 'w-bf',
      title: 'Green Spinach Banana Smoothie with Hemp Hearts',
      description: 'Energizing nut-free smoothie with oat milk and cold-pressed hemp protein.',
      prepTimeMinutes: 5,
      cookTimeMinutes: 0,
      servings: 2,
      category: 'Breakfast',
      safetyVerified: true,
      allergensFree: ['Gluten-Free', 'Nut-Free', 'Dairy-Free'],
      ingredients: [{ name: 'Organic Spinach', amount: '2 cups' }, { name: 'Banana', amount: '1 frozen' }],
      instructions: ['Blend until silky smooth in dedicated blender pitcher.'],
      crossContaminationProtocol: ['Wash blender pitcher thoroughly after roommate protein powders.']
    },
    lunch: INITIAL_RECIPES[1],
    dinner: INITIAL_RECIPES[3],
    snack: {
      id: 'w-sn',
      title: 'Toasted Pumpkin Seeds with Smoked Paprika',
      description: 'Crunchy pepitas roasted with sea salt and smoked pimentón.',
      prepTimeMinutes: 2,
      cookTimeMinutes: 8,
      servings: 2,
      category: 'Snack',
      safetyVerified: true,
      allergensFree: ['Nut-Free', 'Gluten-Free'],
      ingredients: [{ name: 'Raw Pumpkin Seeds (Pepitas)', amount: '1 cup' }],
      instructions: ['Dry roast in skillet with paprika and sea salt.'],
      crossContaminationProtocol: ['Ensure pumpkin seeds are processed in nut-free facility.']
    }
  },
  {
    day: 'Thursday',
    dateStr: 'Oct 8',
    breakfast: {
      id: 'th-bf',
      title: 'Certified GF Rolled Oats with Chia & Blueberries',
      description: 'Slow cooked Bob’s Red Mill certified GF oats with cinnamon and fresh berries.',
      prepTimeMinutes: 5,
      cookTimeMinutes: 10,
      servings: 2,
      category: 'Breakfast',
      safetyVerified: true,
      allergensFree: ['Gluten-Free', 'Nut-Free', 'Dairy-Free'],
      ingredients: [{ name: 'Certified GF Oats', amount: '1 cup' }],
      instructions: ['Cook oats with water and berries.'],
      crossContaminationProtocol: ['Clean pot inspection.']
    },
    lunch: INITIAL_RECIPES[3],
    dinner: INITIAL_RECIPES[2],
    snack: {
      id: 'th-sn',
      title: 'Cucumber Rounds with Herbed Tahini Dip',
      description: 'Refreshing cucumber slices dipped in sesame tahini with garlic and parsley.',
      prepTimeMinutes: 5,
      cookTimeMinutes: 0,
      servings: 2,
      category: 'Snack',
      safetyVerified: true,
      allergensFree: ['Gluten-Free', 'Nut-Free'],
      ingredients: [{ name: 'Persian Cucumbers', amount: '4' }, { name: 'Sesame Tahini', amount: '1/3 cup' }],
      instructions: ['Whisk tahini with lemon juice and water until creamy.'],
      crossContaminationProtocol: ['Verify sesame tahini is nut-free certified.']
    }
  },
  {
    day: 'Friday',
    dateStr: 'Oct 9',
    breakfast: {
      id: 'f-bf',
      title: 'Scrambled Eggs with Fresh Herbs & GF Toast',
      description: 'Soft scrambled eggs served with Canyon Bakehouse certified gluten-free toast.',
      prepTimeMinutes: 5,
      cookTimeMinutes: 5,
      servings: 2,
      category: 'Breakfast',
      safetyVerified: true,
      allergensFree: ['Gluten-Free', 'Nut-Free'],
      ingredients: [{ name: 'Pasture Eggs', amount: '4' }, { name: 'Canyon Bakehouse GF Bread', amount: '2 slices' }],
      instructions: ['Scramble eggs gently in butter or oil. Toast in Sam’s dedicated red toaster.'],
      crossContaminationProtocol: ['NEVER use the shared roommate toaster. Use Sam’s dedicated red GF toaster.']
    },
    lunch: INITIAL_RECIPES[2],
    dinner: INITIAL_RECIPES[0],
    snack: {
      id: 'f-sn',
      title: 'Dark Chocolate Chips (Nut-Free Facility) & Strawberries',
      description: 'Enjoy Life certified allergy-friendly dark chocolate with fresh strawberries.',
      prepTimeMinutes: 2,
      cookTimeMinutes: 0,
      servings: 2,
      category: 'Snack',
      safetyVerified: true,
      allergensFree: ['Top 9 Allergen Free'],
      ingredients: [{ name: 'Enjoy Life Dark Chocolate Chips', amount: '1/2 cup' }],
      instructions: ['Serve with sweet ripe strawberries.'],
      crossContaminationProtocol: ['Enjoy Life brand is dedicated Top 9 allergen free.']
    }
  }
];

export const INITIAL_GROCERY_ITEMS: GroceryItem[] = [
  {
    id: 'g-1',
    name: 'San-J Organic Tamari (Certified Gluten-Free)',
    category: 'Spices & Condiments',
    amount: '1 bottle (10 oz)',
    isCompleted: false,
    safeBrandRecommendation: 'San-J Gluten-Free Soy Sauce Alternative',
    allergyNotice: 'Must say "Certified Gluten-Free". Never grab Kikkoman regular soy sauce!'
  },
  {
    id: 'g-2',
    name: 'Bob’s Red Mill Rolled Oats (Certified Gluten-Free)',
    category: 'Pantry & Grains',
    amount: '1 bag (32 oz)',
    isCompleted: false,
    safeBrandRecommendation: 'Bob’s Red Mill GF Only',
    allergyNotice: 'Regular oats are heavily cross-contaminated in fields with wheat.'
  },
  {
    id: 'g-3',
    name: 'SunButter Natural Sunflower Seed Butter',
    category: 'Pantry & Grains',
    amount: '1 jar (16 oz)',
    isCompleted: true,
    safeBrandRecommendation: 'SunButter (Yellow Lid)',
    allergyNotice: '100% peanut and tree-nut free certified facility.'
  },
  {
    id: 'g-4',
    name: 'Chicken Thighs (Fresh Butcher Cut, Bone-in)',
    category: 'Proteins',
    amount: '3 lbs',
    isCompleted: false,
    allergyNotice: 'Unmarinated, raw chicken only.'
  },
  {
    id: 'g-5',
    name: 'Yukon Gold Potatoes',
    category: 'Produce',
    amount: '3 lbs bag',
    isCompleted: true
  },
  {
    id: 'g-6',
    name: 'Fresh Lemons & Garlic Heads',
    category: 'Produce',
    amount: '4 lemons, 2 heads garlic',
    isCompleted: false
  },
  {
    id: 'g-7',
    name: 'Fresh Rosemary & Thyme bunches',
    category: 'Produce',
    amount: '1 package each',
    isCompleted: false
  },
  {
    id: 'g-8',
    name: 'Native Forest Organic Coconut Milk (Unsweetened)',
    category: 'Pantry & Grains',
    amount: '3 cans',
    isCompleted: false,
    safeBrandRecommendation: 'Native Forest Simple (No guar gum)',
    allergyNotice: 'Nut-free processing facility.'
  },
  {
    id: 'g-9',
    name: '100% White Corn Tortillas (Mission Gluten-Free or La Tortilla Factory)',
    category: 'Pantry & Grains',
    amount: '1 pack (12 ct)',
    isCompleted: false,
    allergyNotice: 'Check for "Corn only", no wheat flour blend.'
  },
  {
    id: 'g-10',
    name: 'Enjoy Life Allergy-Friendly Semi-Sweet Mini Chips',
    category: 'Pantry & Grains',
    amount: '1 bag',
    isCompleted: false,
    safeBrandRecommendation: 'Enjoy Life Brand',
    allergyNotice: 'Top 9 allergen-free certified facility.'
  }
];

export const KITCHEN_SAFETY_RULES: KitchenSafetyRule[] = [
  {
    id: 'rule-1',
    title: 'The Red Toaster is Sam’s Sanctuary',
    category: 'Cross-Contamination',
    priority: 'Critical',
    description: 'Wheat bread crumbs linger in toasters forever. Even a microscopic crumb can trigger days of severe autoimmune flare-up for Celiac disease. The red toaster is strictly for certified gluten-free bread only.',
    appliesTo: 'All Roommates & Guests'
  },
  {
    id: 'rule-2',
    title: 'Double-Dip Ban on Butter, Mayo & Jams',
    category: 'Shared Condiments',
    priority: 'Critical',
    description: 'Never stick a knife used on wheat toast back into the shared butter dish or peanut butter jar. We use squeeze bottles or label "Sam’s Safe Butter" separately.',
    appliesTo: 'Shared Apartment Pantry'
  },
  {
    id: 'rule-3',
    title: 'Color-Coded Cutting Boards & Sponges',
    category: 'Cooking Surfaces',
    priority: 'Critical',
    description: 'Green cutting board is strictly allergen-safe. Blue sponge is for allergy-safe cookware. Regular yellow/green sponge can harbor gluten proteins in porous scrubbers.',
    appliesTo: 'Kitchen Sink & Prep Counter'
  },
  {
    id: 'rule-4',
    title: 'No Peanuts or Tree Nuts in Open Snack Bowls',
    category: 'Storage',
    priority: 'Critical',
    description: 'Because nut anaphylaxis can be triggered by airborne dust or accidental hand-to-surface transfer, loose peanuts and almonds are prohibited in the shared living room.',
    appliesTo: 'Apartment Common Area'
  },
  {
    id: 'rule-5',
    title: 'Sanitize Counters Before Shared Cooking',
    category: 'Cooking Surfaces',
    priority: 'Important',
    description: 'Always wipe down counters with warm soapy water and a fresh paper towel before starting dinner prep.',
    appliesTo: 'Dinner Shifts'
  }
];

export const DEVRELAY_SUBMISSION_POST = `SafePlate: The Allergy-Safe Kitchen Guardian Built for My Roommate (Powered by On-Device Open-Weight AI)
*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

## What I Built
I built **SafePlate** for my college roommate and closest friend, **Sam**. 

Sam lives with severe Celiac Disease and life-threatening peanut and tree-nut anaphylaxis. Sharing a small apartment kitchen in college was an endless source of dread and friction: roommates constantly bought seasonings with hidden wheat derivatives (maltodextrin, brewer's yeast, soy sauce blends), accidentally cross-contaminated cookware, and Sam had to spend 20 minutes in supermarket aisles squinting at tiny font labels while hungry.

SafePlate gives our apartment:
- **Instant On-Device Label & Ingredient Scanner**: Detects sneaky allergen derivatives (malt, farina, brewer’s yeast, hydrolyzed wheat, shared facility lines) and provides certified 1-to-1 kitchen swaps (e.g. San-J GF Tamari, SunButter, coconut aminos).
- **Safe Shared Weekly Meal Planner**: Curated comfort dinners certified 100% safe for Sam that all roommates love (under $4/portion), with step-by-step cooking and isolation protocols.
- **Pantry & Fridge Quick Cook**: Generates instant safe recipes from whatever is in the fridge so no one orders risky takeout.
- **Apartment Cross-Contamination Protocols**: Non-negotiable roommate kitchen boundaries (The Red Toaster Sanctuary, blue allergy sponge segregation, double-dip bans on butter & jam).
- **Safe Smart Grocery List**: Filterable shopping checklist with specific brand guidance so roommates never grab the wrong soy sauce or oats.

## Demo
- **Live Deployed App**: https://ais-pre-jeg2cbrol7f2to5cry7if6-1000591823797.asia-southeast1.run.app
- **Local Dev Sandbox**: https://ais-dev-jeg2cbrol7f2to5cry7if6-1000591823797.asia-southeast1.run.app

## Code
The project is built as a production-grade TypeScript React web application powered by on-device open-weight model architectures. 

Key code modules:
- \`/src/services/openAiEngine.ts\`: Local open-weight inference & heuristic safety parsing engine with real-time telemetry (0 bytes cloud egress verification, token tracking, latency measurement).
- \`/src/components/IngredientScanner.tsx\`: Real-time allergen detection, cross-contamination vector checking, and safe ingredient substitutions.
- \`/src/components/MealPlanner.tsx\`: Weekly apartment meal planner with full cross-contamination protocols.
- \`/src/components/PantryChef.tsx\`: On-demand safe recipe synthesis from on-hand ingredients.
- \`/src/components/KitchenSafetyChecklist.tsx\`: Shared apartment kitchen rules and fridge pledge.
- \`/src/components/OpenSourceInspector.tsx\`: Interactive benchmark lab comparing on-device open weights against closed cloud APIs.

## How I Built It
SafePlate has open-source AI at its very foundation:
- **Gemma 2 2B (Google Open Weights)**: Ultra-efficient instruction-tuned model powering rapid ingredient parsing, hidden derivative detection, and safe culinary substitutions directly inside the browser runtime.
- **Llama 3.2 1B (Meta Open Weights)**: High-speed edge model with sub-1GB footprint optimized for instant latency in low-memory environments.
- **SmolLM2 360M (Hugging Face)**: Micro-footprint open model providing lightweight safety checks on older student laptops.
- **Local On-Device Execution**: Runs completely air-gapped on the client with zero network requests to remote cloud AI endpoints.

## Why Does Open Innovation Matter?
Building for a real person with medical vulnerabilities proved why open innovation is vastly superior to closed cloud APIs:
1. **Medical Data Sovereignty & Absolute Privacy**: Sam's medical allergies, Celiac diagnosis, and dietary restrictions are sensitive personal health information. Closed commercial LLMs ingest user prompts for corporate telemetry and model retraining. With open-weight models, **0 bytes leave the device**.
2. **Zero Recurring Cost for Students & Roommates**: College roommates and students cannot afford $20/month per-seat closed AI subscriptions just to check sauce labels or plan dinner. Open models run forever at zero marginal cost.
3. **Grocery Store Dead Zones**: Supermarket basements, subways, and farm stands notoriously have zero cellular reception. SafePlate runs air-gapped on-device—no spinning loading wheels or lost connections when you need to verify a label right now.
4. **Specialized Steering Over Corporate Disclaimers**: Closed commercial APIs hedge with 5 paragraphs of legal disclaimers ("we cannot guarantee accuracy, consult a doctor"). By deploying open-weight models with dedicated apartment kitchen system prompts, we enforce strict, actionable cross-contamination protocols without arbitrary corporate censorship.

## What Sam Said Upon Handoff
> *"Dude, you actually made this for me?! Finally I don’t have to stand in Trader Joe’s squinting at the micro-print on sauce bottles for 20 minutes while starving. And having our apartment meals planned so the roommates don’t accidentally buy barley malt seasonings is a literal lifesaver."*
> — **Sam**, Apartment 4B Roommate

## My Agent Session
Agent session saved with DevRelay. Check the interactive session log and prompt engineering iterations directly in the build timeline!

## Prize Categories
- **Open-Source AI at its Core**
- **Edge / On-Device AI & Privacy**
- **Build for a Friend (Most Heartwarming & Usable)**
`;
