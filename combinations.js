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
    console.log('getCombinations 호출 >>> 원본배열', arr, '선택개수', count);

    const results = [];
    if (count === 1) return arr.map((value) => [value]); // 1개씩 택할 때, 바로 모든 배열의 원소 return

    //            curr, index, arr
    arr.forEach((fixed, index, origin) => {
        console.log('@ forEach - fixed ', fixed, ' - index ', index);
        const noFixedArr = origin.slice(index + 1); // fixed를 제외한 배열

        const combinations = getCombinations(noFixedArr, count - 1); // fixed를 제외한 배열의 조합.

        const attached = combinations.map((combination) => [fixed, ...combination]); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
        console.log('@ forEach - fixed ', fixed, ' - index ', index);
        console.log('fiexd 연결 >>> fixed', fixed, '선택개수 1개 return값', combinations);
        console.log('................................................................................');

        results.push(...attached); // 배열 spread syntax 로 모두 다 push
    });

    return results; // 결과가 담긴 results를 return
};

const combiArr = [1, 2, 3, 4];
const resultArr = getCombinations(combiArr, 3);
console.log('콤비', resultArr);
// => [ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 3, 4 ] ]

/*

getCombinations 호출 >>> 원본배열 [ 1, 2, 3, 4 ] 선택개수 3
@ forEach
getCombinations 호출 >>> 원본배열 [ 2, 3, 4 ] 선택개수 2
@ forEach
getCombinations 호출 >>> 원본배열 [ 3, 4 ] 선택개수 1
fiexd 연결 >>> fixed 2 선택개수 1개 return값 [ [ 3 ], [ 4 ] ]

[ [ 2, 3 ], [ 2, 4 ] ]
................................................................................
@ forEach
getCombinations 호출 >>> 원본배열 [ 4 ] 선택개수 1
fiexd 연결 >>> fixed 3 선택개수 1개 return값 [ [ 4 ] ]
................................................................................
@ forEach
getCombinations 호출 >>> 원본배열 [] 선택개수 1
fiexd 연결 >>> fixed 4 선택개수 1개 return값 []
// 재귀 싸이클 1회 종료
................................................................................
// attached 이동 fixed 1부터 .. return값 연결
fiexd 연결 >>> fixed 1 선택개수 1개 return값 [ [ 2, 3 ], [ 2, 4 ], [ 3, 4 ] ]

[ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 1, 3, 4 ] ]

// fixed 2 선택개수 2개
................................................................................
@ forEach
getCombinations 호출 >>> 원본배열 [ 3, 4 ] 선택개수 2
// fixed 3 선택개수 1개 index 0

@ forEach
getCombinations 호출 >>> 원본배열 [ 4 ] 선택개수 1
fiexd 연결 >>> fixed 3 선택개수 1개 return값 [ [ 4 ] ]

[ [ 3, 4 ] ]
................................................................................
@ forEach
getCombinations 호출 >>> 원본배열 [] 선택개수 1
fiexd 연결 >>> fixed 4 선택개수 1개 return값 []
// 재귀 싸이클 2회 종료
................................................................................
// fixed 2 index 1 arr [1, 2, 3, 4]
// attached 이동 fixed 2부터 .. return값 연결
fiexd 연결 >>> fixed 2 선택개수 1개 return값 [ [ 3, 4 ] ]

[ [ 2, 3, 4 ] ]
................................................................................
// fixed 3 index 1 arr [1, 2, 3, 4] 선택개수 2개
@ forEach
getCombinations 호출 >>> 원본배열 [ 4 ] 선택개수 2

// fixed 4 index 0 arr [4] 선택개수 2개
@ forEach
getCombinations 호출 >>> 원본배열 [] 선택개수 1
fiexd 연결 >>> fixed 4 선택개수 1개 return값 []

[ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 3, 4 ] ]

// 재귀 싸이클 3회 종료
................................................................................
// fixed 3 index 2 arr [1, 2, 3, 4]
fiexd 연결 >>> fixed 3 선택개수 1개 return값 []
// 재귀 싸이클 4회 종료
................................................................................
// fixed 4 index 3 arr [1, 2, 3, 4]
@ forEach
getCombinations 호출 >>> 원본배열 [] 선택개수 2
fiexd 연결 >>> fixed 4 선택개수 1개 return값 []
// 재귀 싸이클 종료
................................................................................

콤비 [ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 3, 4 ] ]
*/
