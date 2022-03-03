// DFS (Depth First Search, Stack) 스택 자료구조
const solution = function (numbers, target) {
    let answer = 0;

    function dfs(depth, sum) {
        console.log(depth);
        if (depth === numbers.length) {
            // 깊이가 숫자 길이와 같으면
            if (sum === target) {
                // 결과 값이 target 넘버와 같으면
                answer += 1;
            }
            return;
        }

        // 재귀함수를 이용하게 되면
        // return 값들이 순차적으로 stack프레임에 쌓였다가
        // 종료조건을 만나면 다시 차례대로 stack프레임에서 빠져나가면서 종료된다.

        // return을 만나면 다음줄로 이동 (오른쪽, 음수)
        dfs(depth + 1, sum + numbers[depth]); // 왼쪽
        dfs(depth + 1, sum - numbers[depth]); // 오른쪽
    }

    //depth, sum
    dfs(0, 0);

    console.log('answer', answer);
    return answer;
};

solution([1, 1, 1, 1, 1], 3);
// solution([4, 1, 2, 1], 4);
