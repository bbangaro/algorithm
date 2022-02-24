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
        console.log('origin', origin, 'index', index + 1, 'noFixedArr', noFixedArr);

        const attached = combinations.map((combination) => [fixed, ...combination]); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기

        results.push(...attached); // 배열 spread syntax 로 모두 다 push
    });

    return results; // 결과가 담긴 results를 return
};

const arr = [1, 2, 3, 4];
const result = getCombinations(arr, 3);
console.log('콤비', result);
// => [ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 3, 4 ] ]

/*
순열(Permutations)
순열은 n개 중에 r개를 뽑는 경우의 수를 구할 때 순서를 고려해 뽑는다. 
이게 조합과의 차이점이다.

4P3 = 4Permutation3 은 4개 중에 3개를 선택하는데 ‘순열’으로 나올 수 있는 경우의 수를 구한다는 말이다. 
조합에서처럼 코드로 생각해보면 다음과 같다.

Input: [1,2,3,4]
Output: [
    [1,2,3],[1,2,4],[1,3,2],[1,3,4],[1,4,2],[1,4,3],
    [2,1,3],[2,1,4],[2,3,1],[2,3,4],[2,4,1],[2,4,3],
    [3,1,2],[3,1,4],[3,2,1],[3,2,4],[3,4,1],[3,4,2],
    [4,1,2],[4,1,3],[4,2,1],[4,2,3],[4,3,1],[4,3,2]
]

순열은 조합을 구하는 코드와 별반 다르지 않게 구현할 수 있다. 
[1,2,3,4] 중에 3개를 순열로 뽑는 예시를 의사코드로 생각해보자.

1(fixed) -> permutation([2,3,4]) -> 2(fixed) -> permutation(3,4) -> ...
2(fixed) -> permutation([1,3,4]) -> 1(fixed) -> permutation(3,4) -> ...
3(fixed) -> permutation([1,2,4]) -> ...
4(fixed) -> permutation([1,2,3]) -> ...


조합과 다른 점은 배열의 처음부터 선택(고정)하면서 나머지 배열을 구할 때 고정된 값 뒤에 있는 값들에 대해서 순열을 구하는게 아니라, 
고정된 값을 제외한 모든 원소에 대해서 순열을 구해야 한다는 것이다.

조합 코드에서 나머지 배열을 구하는 코드만 다음과 같이 바꾸면 된다.

const rest = [...origin.slice(0, index), ...origin.slice(index+1)] // 해당하는 fixed를 제외한 나머지 배열
*/

const getPermutations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((value) => [value]); // 1개씩 택할 때, 바로 모든 배열의 원소 return

    arr.forEach((fixed, index, origin) => {
        const rest = [...origin.slice(0, index), ...origin.slice(index + 1)]; // 해당하는 fixed를 제외한 나머지 배열
        const permutations = getPermutations(rest, selectNumber - 1); // 나머지에 대해 순열을 구한다.
        const attached = permutations.map((permutation) => [fixed, ...permutation]); // 돌아온 순열에 대해 떼 놓은(fixed) 값 붙이기
        results.push(...attached); // 배열 spread syntax 로 모두다 push
    });

    return results; // 결과 담긴 results return
};

const arr2 = [1, 2, 3, 4];
const result2 = getPermutations(arr2, 3);
console.log('순열', result2);
// => [
//   [ 1, 2, 3 ], [ 1, 2, 4 ],
//   [ 1, 3, 2 ], [ 1, 3, 4 ],
//   [ 1, 4, 2 ], [ 1, 4, 3 ],
//   [ 2, 1, 3 ], [ 2, 1, 4 ],
//   [ 2, 3, 1 ], [ 2, 3, 4 ],
//   [ 2, 4, 1 ], [ 2, 4, 3 ],
//   [ 3, 1, 2 ], [ 3, 1, 4 ],
//   [ 3, 2, 1 ], [ 3, 2, 4 ],
//   [ 3, 4, 1 ], [ 3, 4, 2 ],
//   [ 4, 1, 2 ], [ 4, 1, 3 ],
//   [ 4, 2, 1 ], [ 4, 2, 3 ],
//   [ 4, 3, 1 ], [ 4, 3, 2 ]
// ]
