/*
조합(Combinations)
조합은 n개 중에 r개를 뽑는 경우의 수를 구할 때 순서를 고려하지 않는 개념이다.

4C3 = 4Combination3 은 4개 중에 3개를 선택하는데 ‘조합’으로 나올 수 있는 경우의 수를 구한다는 말이다. 
코드로 생각해보면 다음과 같다.

Input: [1,2,3,4]
Output: [ [1,2,3], [1,2,4], [1,3,4], [2,3,4] ]

조합에서는 순서를 고려하지 않기 때문에 [1,2,3] = [3,2,1] 
이렇게 순서가 달라도 ‘같은’ 경우의 수로 취급한다.

*/

const getCombinations = function (arr, count) {
    const results = [];
    if (count === 1) return arr.map((value) => [value]); // 1개씩 택할 때, 바로 모든 배열의 원소 return

    //        curValue, index, arr
    arr.forEach((fixed, index, origin) => {
        const noFixedArr = origin.slice(index + 1); // fixed를 제외한 배열

        const combinations = getCombinations(noFixedArr, count - 1); // fixed를 제외한 배열의 조합.

        const attached = combinations.map((combination) => [fixed, ...combination]); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기

        results.push(...attached); // 배열 spread syntax 로 모두 다 push
    });

    return results; // 결과가 담긴 results를 return
};

const arr = [1, 2, 3, 4];
const result = getCombinations(arr, 3);
console.log('콤비', result);
// => [ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 3, 4 ] ]
