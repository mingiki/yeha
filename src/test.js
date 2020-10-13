import ApiService from '../src/app/service/ApiService';


/**
 * Test
 * 
 * writer : 대교 CNS 기술연구소 김민기
 * version : 1.0
 * date : 2020-07-08
 * 
 * - 프론트 테스트
 * - jest 사용
 */

 
var api = new ApiService();

/**
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 *                                     [  API 테스트 - Open Vidu ]
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */ 

test("api a create session", async () => {
    const result = await api.createSession();
    expect(result).toEqual({
        id: 1,
        name: "User1",
        email: "1@test.com",
    })
})