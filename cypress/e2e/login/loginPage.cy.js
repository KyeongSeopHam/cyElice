import '../../support/commands'

//로그인 페이지 테스트

describe('앱 로드가 정상적으로 되어야 한다.', () => {
  beforeEach(() => {
    cy.visit('/') //실행전 루트방문 init->commands
  })

  it('비 로그인 시 로그인 페이지 이동 ', () => {
    cy.clearCookie('eliceSessionKey')
    cy.url().should('include', '/accounts/signin')
  })

// Cypress 테스트 시작
describe('언어 설정 테스트', () => {
  it('한국어로 설정하고 테스트', () => {
    // 한국어로 언어 설정 변경
    cy.setCookie('lang', 'ko'); // 예시: 언어 설정 쿠키 설정

    // 웹 앱 로드
    cy.visit('/'); // 웹 앱 루트 페이지 URL

    // 언어 설정이 한국어로 변경되었는지 확인
    cy.get('.language-selector').should('contain', '한국어'); // 예시: 언어 선택 요소

    // 원하는 동작을 수행하고 검증
    // ...

    // 원래 언어로 복원
    cy.clearCookie('lang'); // 예시: 언어 설정 쿠키 삭제
  });

  it('영어로 설정하고 테스트', () => {
    // 영어로 언어 설정 변경
    cy.setCookie('lang', 'en'); // 예시: 언어 설정 쿠키 설정

    // 웹 앱 로드
    cy.visit('/'); // 웹 앱 루트 페이지 URL

    // 언어 설정이 영어로 변경되었는지 확인
    cy.get('.language-selector').should('contain', 'English'); // 예시: 언어 선택 요소

    // 원하는 동작을 수행하고 검증
    // ...

    // 원래 언어로 복원
    cy.clearCookie('lang'); // 예시: 언어 설정 쿠키 삭제
  });
});





  it('페이지 로드, 기본 요소 랜더딩 확인 ', () => {

    cy.checkPageLoadAndComponents(); // 페이지 로딩 및 컴포넌트 확인 
    cy.visit('/')
  })


  it('한/영 변환 테스트 확인 (footer 에 한영변환 UI 가 존재함)', () => {

    cy.languageSwitchTest();

  });


  it('로그인 후 account 설정페이지로 이동 확인', () => {
    cy.login('rudtjq9300@naverr.com', 'asdasda52#!%^^') // 엘리스 자체 id,pw 입력  [테스트아이디생성]
    cy.url().should('include', '/members/account')
    cy.getCookie('eliceSessionKey').should('exist')

  })
})