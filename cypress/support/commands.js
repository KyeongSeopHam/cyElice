// 로그인[이메일,패스워드] 필드 추가 -> 로그인시도 
Cypress.Commands.add('login', (email, pw) => {
    cy.get('input[name="loginId"]').type(email)
    cy.get('input[name="password"]').type(pw)
    cy.get('button[type="submit"]').click()
});

// 로그인 방법중  SNS 6종 로그인
Cypress.Commands.add('snsClickCheck', (labels) => {
  labels.forEach((label) => {
    cy.get(`button[aria-label="${label}"]`).click();
  });
});


Cypress.Commands.add('checkPageLoadAndComponents', () => {
  // 엘리스 로고 확인
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

  // 추가 SNS 로그인 6종 [함수화]
  cy.snsClickCheck(["Microsoft", "Facebook", "Naver", "Github", "Apple", "Whalespace"]);

  // 회원가입 클릭
  cy.contains('회원가입').click();
});


// [Footer] 페이지 언어 선택 전환 컴포넌트 검증 -> 추후 확장성 언어추가 고려
Cypress.Commands.add('languageSwitchTest', (defaultLang, targetLang, targetText1,targetText2) => {
  cy.get('select').should('have.value', defaultLang);  // select엘리멘트에서 에트리뷰트값 확인('ko') 

  cy.get('select').select(targetLang);
  cy.contains(targetText1).should('be.visible');

  cy.get('select').select(defaultLang);
  cy.contains(targetText2).should('be.visible');
});