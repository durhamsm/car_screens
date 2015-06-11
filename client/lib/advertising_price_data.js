


stateAbreviations = {
  "AL":"Alabama",
  "AK":"Alaska",
  "AZ":"Arizona",
  "AR":"Arkansas",
  "CA":"California",
  "CO":"Colorado",
  "CT":"Connecticut",
  "DE":"Delaware",
  "FL":"Florida",
  "GA":"Georgia",
  "HI":"Hawaii",
  "ID":"Idaho",
  "IL":"Illinois",
  "IN":"Indiana",
  "IA":"Iowa",
  "KS":"Kansas",
  "KY":"Kentucky",
  "LA":"Louisiana",
  "ME":"Maine",
  "MD":"Maryland",
  "MA":"Massachusetts",
  "MI":"Michigan",
  "MN":"Minnesota",
  "MS":"Mississippi",
  "MO":"Missouri",
  "MT":"Montana",
  "NE":"Nebraska",
  "NV":"Nevada",
  "NH":"New Hampshire",
  "NJ":"New Jersey",
  "NM":"New Mexico",
  "NY":"New York",
  "NC":"North Carolina",
  "ND":"North Dakota",
  "OH":"Ohio",
  "OK":"Oklahoma",
  "OR":"Oregon",
  "PA":"Pennsylvania",
  "RI":"Rhode Island",
  "SC":"South Carolina",
  "SD":"South Dakota",
  "TN":"Tennessee",
  "TX":"Texas",
  "UT":"Utah",
  "VT":"Vermont",
  "VA":"Virginia",
  "WA":"Washington",
  "WV":"West Virginia",
  "WI":"Wisconsin",
  "WY":"Wyoming"
};

stateAbrevArray = [];

for (var abrev in stateAbreviations) {
  stateAbrevArray.push({"abrev": abrev, "full": stateAbreviations[abrev]})
}



statePopulations = {
  'CA': 36132147,
  'TX': 22859968,
  'NY': 19254630,
  'FL': 17789864,
  'IL': 12763371,
  'PA': 12429616,
  'OH': 11464042,
  'MI': 10120860,
  'GA': 9072576,
  'NJ': 8717925,
  'NC': 8683242,
  'VA': 7567465,
  'MA': 6398743,
  'WA': 6287759,
  'IN': 6271973,
  'TN': 5962959,
  'AZ': 5939292,
  'MO': 5800310,
  'MD': 5600388,
  'WI': 5536201,
  'MN': 5132799,
  'CO': 4665177,
  'AL': 4557808,
  'LA': 4523628,
  'SC': 4255083,
  'KY': 4173405,
  'OR': 3641056,
  'OK': 3547884,
  'CT': 3510297,
  'IA': 2966334,
  'MS': 2921088,
  'AR': 2779154,
  'KS': 2744687,
  'UT': 2469585,
  'NV': 2414807,
  'NM': 1928384,
  'WV': 1816856,
  'NE': 1578385,
  'ID': 1429096,
  'ME': 1321505,
  'NH': 1309940,
  'HI': 1275194,
  'RI': 1076189,
  'MT': 935670,
  'DE': 843524,
  'SD': 775933,
  'AK': 663661,
  'ND': 636677,
  'VT': 623050,
  'WY': 509294
};

pricingAlgorithm = function(statesArray, subscriptionDurationMonths) {
  //price per month, dollars
  //alert("hey");
  var basePrice = 15;
  
  //max additional price (max for state with max population)
  var additionalMaxPrice = 100;
  
  //Bulk discount
  var discountObject = {
    '1': 0,
    '3': 25,
    '6': 30,
    '12': 40
  };
  
  //algorithm
  var numStates = statesArray.length;
  var totalPrice = 15*numStates;
  
  for (var index = 0; index < numStates; ++index) {
    totalPrice += statePopulations[statesArray[index]] / statePopulations.CA * additionalMaxPrice;
  }
  
  totalPrice *= (100 - discountObject[subscriptionDurationMonths.toString()]) / 100;
  
  //alert(totalPrice);
  return totalPrice;
}

