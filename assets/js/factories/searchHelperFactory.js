// angular.module('algolia')
//   .factory('searchHelper', searchHelper);
// searchHelper.$inject=['algolia'];
// function searchHelper( algolia ) {
//   var client = algolia.Client( "J31118LB7W", "805c64911a7abd9b7a02ac3fe9f28d00");
//   var index = client.initIndex('restaurants');
//   return algoliasearchHelper(
//     client, 'restaurants', {
//       facets: ['food_type'],       // list of conjunctive facets
//       disjunctiveFacets: ['stars_count'], // list of disjunctive facets
//       hitsPerPage: 20,
//       maxValuesPerFacet: 3
//     }
//   );
//
// }// end of HOME CONTROLLER
