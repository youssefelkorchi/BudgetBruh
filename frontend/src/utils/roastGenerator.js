// Roast categories based on spending amount
const getAmountCategory = (amount) => {
  if (amount < 20) return 'small';
  if (amount < 100) return 'medium';
  return 'large';
};

// Category icons and descriptions
export const categoryInfo = {
  food: { icon: '🍔', description: 'Food & Drinks (Your Stomach\'s Demands)' },
  entertainment: { icon: '🎮', description: 'Entertainment (Your Happiness Tax)' },
  shopping: { icon: '🛍️', description: 'Shopping (The "Needs")' },
  bills: { icon: '💸', description: 'Bills (The Unavoidable Pain)' },
  travel: { icon: '✈️', description: 'Travel (Escaping Reality)' },
  health: { icon: '🏥', description: 'Health (Body Maintenance)' },
  other: { icon: '❓', description: 'Other (The Mysterious Money Pit)' }
};

// Roast database
const roasts = {
  food: {
    small: [
      "A $5 coffee? That's one step closer to the 'Broke Coffee Addicts Anonymous' club.",
      "Spending on snacks again? Your wallet is on a diet even if you're not.",
      "That cheap meal might save money, but your taste buds are filing for divorce."
    ],
    medium: [
      "$20 on food? You're feeding an army of one.",
      "Restaurant again? Your kitchen is getting jealous of all the attention you're giving other chefs.",
      "Your fridge is empty but your stomach is full. Priorities, I guess?"
    ],
    large: [
      "Do you even know what a grocery store is?",
      "At this rate, you'll be eating instant ramen for the rest of the month. Enjoy those sodium levels!",
      "Your food budget is higher than your rent. Are you eating gold-plated avocado toast?"
    ]
  },
  entertainment: {
    small: [
      "Another subscription? You're collecting them like Pokémon cards.",
      "That movie better have been worth skipping lunch tomorrow.",
      "Entertainment or electricity bill? Tough choices ahead."
    ],
    medium: [
      "Your entertainment budget is higher than some countries' GDP.",
      "Netflix, Hulu, Disney+, and now this? You're single-handedly keeping the streaming industry alive.",
      "Fun fact: Being entertained doesn't pay your bills."
    ],
    large: [
      "Who needs retirement savings when you have a premium entertainment package?",
      "Your future self called. They're not entertained by your current spending habits.",
      "Entertainment or rent? Based on this expense, we know which one you value more."
    ]
  },
  shopping: {
    small: [
      "Another 'essential' purchase? Your definition of essential is fascinating.",
      "Your closet called. It's running out of space for things you'll never use.",
      "Shopping therapy is still cheaper than real therapy, I guess."
    ],
    medium: [
      "New outfit? Let's hope it comes with a money-making feature.",
      "Your shopping cart is fuller than your fridge. Interesting priorities.",
      "That's not a purchase, that's a financial decision you'll regret next week."
    ],
    large: [
      "Did your credit card catch fire after that purchase?",
      "I hope that purchase comes with a free financial advisor.",
      "Congratulations on your contribution to the economy. Your bank account sends its condolences."
    ]
  },
  bills: {
    small: [
      "Bills: The subscription service to adulthood you never asked for.",
      "At least this bill is smaller than your coffee budget.",
      "Paying bills: Because living in a cardboard box isn't aesthetic enough for Instagram."
    ],
    medium: [
      "Bills, bills, bills. The real horror story of adulthood.",
      "That's a lot of money for something that doesn't even spark joy.",
      "Ah, the joys of paying to exist in society."
    ],
    large: [
      "Is your electricity bill high because you're mining Bitcoin or just leaving every light on?",
      "That bill is so high it should come with a complimentary stress ball.",
      "I'd suggest cutting costs, but I know you'll just ignore that advice."
    ]
  },
  travel: {
    small: [
      "Local travel: When you want to escape but your bank account says 'stay home'.",
      "That's a cheap getaway. Did you just drive to the next town over?",
      "Travel light, especially when it comes to spending."
    ],
    medium: [
      "Vacation or basic necessities? You've made your choice.",
      "Running away from your financial responsibilities, I see.",
      "That trip better include a detour to the land of better financial decisions."
    ],
    large: [
      "First class or first in line for bankruptcy?",
      "That vacation cost more than my monthly rent. Hope the Instagram likes were worth it.",
      "Traveling the world while your savings account travels to zero."
    ]
  },
  health: {
    small: [
      "Investing in your health? How responsible. Don't worry, you'll find other ways to waste money.",
      "Health is wealth, but this expense is just pocket change.",
      "A small price to pay for a functioning body. Unlike your functioning budget."
    ],
    medium: [
      "Your body thanks you. Your wallet, not so much.",
      "Health expenses: Because being sick is expensive, but being healthy somehow costs more.",
      "Paying for health while your financial health deteriorates. Ironic."
    ],
    large: [
      "American healthcare system, is that you?",
      "That's an expensive reminder that being human comes with maintenance costs.",
      "Your physical health is improving while your financial health is on life support."
    ]
  },
  other: {
    small: [
      "Mystery spending? Even you don't know where your money goes.",
      "Categorizing as 'Other' is just avoiding accountability. I respect that.",
      "If you can't categorize it, did you really need it?"
    ],
    medium: [
      "That's a lot of money for something you can't even categorize.",
      "'Other' is the financial equivalent of your miscellaneous drawer at home.",
      "If you spent as much time budgeting as you do creating mystery expenses, you'd be rich."
    ],
    large: [
      "That's not an 'Other' expense, that's a financial identity crisis.",
      "Spending this much on 'Other' is like saying 'I don't want to talk about it'.",
      "Your largest category is 'Other'? That's like having your personality described as 'miscellaneous'."
    ]
  }
};

// Default fallback roasts if category or amount not found
const defaultRoasts = {
  small: "Small purchase, big impact on your dwindling savings.",
  medium: "Medium expense, maximum regret later.",
  large: "Large expense? Your bank account just shed a tear."
};

// Generate a roast based on category and amount
export const generateRoast = (category, amount, intensity = 'medium') => {
  // Get the appropriate category of roasts
  const amountCategory = getAmountCategory(amount);
  
  // If intensity is 'brutal', always use large category roasts
  const roastCategory = intensity === 'brutal' ? 'large' : amountCategory;
  
  // Get available roasts for this category and amount
  const categoryRoasts = roasts[category] || roasts.other;
  const availableRoasts = categoryRoasts[roastCategory] || categoryRoasts.medium || categoryRoasts.small;
  
  // If no roasts available, use default
  if (!availableRoasts || availableRoasts.length === 0) {
    return defaultRoasts[roastCategory] || defaultRoasts.medium;
  }
  
  // Pick a random roast
  const randomIndex = Math.floor(Math.random() * availableRoasts.length);
  return availableRoasts[randomIndex];
};

// Generate a summary roast based on total spending
export const generateTotalSpendingSummary = (totalAmount) => {
  // Convert totalAmount to a number to ensure toFixed works
  const amount = Number(totalAmount);
  
  if (amount === 0) {
    return "No spending? Either you're incredibly frugal or you're hiding your expenses. I'm betting on the latter.";
  } else if (amount < 100) {
    return `$${amount.toFixed(2)}? That's suspiciously low. Either you're living off ramen or you've forgotten to log most of your expenses.`;
  } else if (amount < 500) {
    return `$${amount.toFixed(2)} spent. Your wallet is on a diet, but it could stand to lose a few more dollars.`;
  } else if (amount < 1000) {
    return `$${amount.toFixed(2)}? That's a lot of money that could have been in your savings account. But hey, who needs financial security?`;
  } else if (amount < 5000) {
    return `$${amount.toFixed(2)} gone! If money burning was an Olympic sport, you'd be taking home the gold.`;
  } else {
    return `$${amount.toFixed(2)}?! At this rate, you'll need to sell a kidney to maintain your lifestyle. But don't worry, you have two!`;
  }
};

export default generateRoast;