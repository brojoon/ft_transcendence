const initData ={
    interval: null,
    player_one_point: 0,
    player_two_point: 0,
    player_one_state: 0,
    player_two_state: 0,
    game_state: 0,
    game_map: 0,
    game_set: 3,
    complete_game_set: 0,
    bar_seed: 30,
    ball_x: 500,
    ball_y: 250,
    player_one_y: 200,
    player_two_y: 200,
}
export = initData;

//// player_one_state / player_two_state ////
// 0 -> 비접속
// 1 -> 접속
// 2 -> 레디

//// game_state ////
// 0 -> 대기
// 1 -> 경기중
// 2 -> 일시중지
// 3 -> 게임 완료

//// game_map ////
// 0 -> 기본 맵
// 1 -> 1번 맵
// 2 -> 2번 맵
// 3 -> 3번 맵

//// game_set ////
// 총 경기수
