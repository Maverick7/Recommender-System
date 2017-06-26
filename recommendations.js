


//Eucledean distance for similarity
function sim_distance(prefs, p1, p2){
    /**
    Returns a distance-based similarity score for person1 and person2.
    **/

    // Get the list of shared_items
    si = {}
    for (item in prefs[p1])
        if (item in prefs[p2])
            si[item] = 1;
    // If they have no ratings in common, return 0
    if (si.length == 0)
        return 0;
    // Add up the squares of all the differences
    for (item in prefs[p1] ) 
    	if (item in prefs[p2])
    	sum_of_squares = ([Math.pow(prefs[p1][item] - prefs[p2][item], 2)]).reduce((a, b) => a + b, 0) ;
    
    return (1 / (1 + Math.sqrt(sum_of_squares)));
}


function sim_pearson(prefs, p1, p2){
    /**
    Returns the Pearson correlation coefficient for p1 and p2.
    **/

    // Get the list of mutually rated items
    si = []
    for (item in prefs[p1])
        if (item in prefs[p2])
            si.push(item);


    // If they are no ratings in common, return 0
    if (si.length == 0)
        return 0;
    // Sum calculations
    n = si.length;


    // Sums of all the preferences
    sum1 = si.map(it => prefs[p1][it]).reduce((a, b) => a + b, 0);
    sum2 = si.map(it => prefs[p2][it]).reduce((a, b) => a + b, 0);
    // Sums of the squares
    sum1Sq = si.map(it=>Math.pow(prefs[p1][it], 2)).reduce((a,b)=>a+b,0) ;
    sum2Sq = si.map(it=>Math.pow(prefs[p2][it], 2)).reduce((a,b)=>a+b,0) ;
    // Sum of the products
    pSum = si.map(it => prefs[p1][it] * prefs[p2][it]).reduce((a,b)=>a+b,0) ;
    // Calculate r (Pearson score)
    num = pSum - sum1 * sum2 / n;
    den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) * (sum2Sq - Math.pow(sum2, 2) / n));
    if (den == 0)
        return 0;
    r = num / den;
    return r

}

function topMatches(
    prefs,
    person,
    n=5,
    similarity=sim_pearson,
){
    /**
    Returns the best matches for person from the prefs dictionary. 
    Number of results and similarity function are optional params.
    **/
    scores=[];
    for (other in prefs)
              if (other != person)
                scores.push(new Array(similarity(prefs, person, other), other)); 
    scores.sort();
    scores.reverse();
    return scores.slice(0,n);
}

function getRecommendations(prefs, person, similarity=sim_pearson){
    /**
    Gets recommendations for a person by using a weighted average
    of every other user's rankings
    **/

    totals = {}
    simSums = {}
    for (other in prefs){
    // Don't compare me to myself
        if (other == person)
            continue;
        sim = similarity(prefs, person, other)
        // Ignore scores of zero or lower
        if (sim <= 0)
            continue;
        for (item in prefs[other]){
            // Only score movies I haven't seen yet
            if (!(item in prefs[person]) || prefs[person][item] == 0){
                // Similarity * Score
                totals[item] = totals[item]==undefined ? 0:totals[item];
                // The final score is calculated by multiplying each item by the
                //  similarity and adding these products together
                totals[item] += prefs[other][item] * sim;
                // Sum of similarities
                simSums[item] = simSums[item]==undefined ? 0:simSums[item];
                simSums[item] += sim;                
            }

        }
    }
    rankings=[];
    // Create the normalized list
    for (item in totals)
        rankings.push(new Array(totals[item] / simSums[item], item)); 
    // Return the sorted list
    rankings.sort();
    rankings.reverse();
    return rankings;
}

