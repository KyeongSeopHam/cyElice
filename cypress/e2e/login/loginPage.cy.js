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


  it('페이지 로드, 기본 요소 랜더딩 확인 ', () => {

    // 엘리스 logo 확인. 
    cy.get('img[src="https://cdn-front-door.elice.io/accounts/static/media/elice_logo.3da193278ac05deb.png"]')
      .should('have.attr', 'alt', 'header_logo')
      .should('be.visible');


    // 컴포넌트 확인 (주요 버튼)
    cy.get('input[name="loginId"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.contains('비밀번호를 잊어버리셨나요?').click();

    cy.url().should('include', '/accounts/recover/password/find/email?continue_to=https%3A%2F%2Faccounts.elice.io%2F&lang=ko');

    cy.visit('/')

    cy.get('button[type="submit"]').should('be.visible')
    cy.get('button[type="button"]').contains("카카오로 로그인").should('be.visible')
    cy.get('button[type="button"]').contains("구글로 로그인").should('be.visible')

    cy.contains("더보기").click();

    // 추가 SNS 로그인 6종
    cy.get('button[aria-label="Microsoft"]').click();
    cy.get('button[aria-label="Facebook"]').click();
    cy.get('button[aria-label="Naver"]').click();
    cy.get('button[aria-label="Github"]').click();
    cy.get('button[aria-label="Apple"]').click();
    cy.get('button[aria-label="Whalespace"]').click();


    cy.contains("접기").click();
    cy.contains('회원가입').click();
    cy.visit('/')
  })


  it('한/영 변환 테스트 확인 (footer 에 한영변환 UI 가 존재함)', () => {

    cy.get('select').should('have.value', 'ko');

    cy.get('select').select('English');
    cy.contains('Login').should('be.visible');

    cy.get('select').select('한국어');
    cy.contains('로그인').should('be.visible');
  });


  it('로그인 후 account 설정페이지로 이동 확인', () => {
    cy.login('rudtjq9300@naverr.com', 'asdasda52#!%^^') // 엘리스 자체 id,pw 입력  [테스트아이디생성]
    cy.url().should('include', '/members/account')
    cy.getCookie('eliceSessionKey').should('exist')
  })
})