Cypress.Commands.add('login', (email, pw) => {
    cy.get('input[name="loginId"]').type(email)
    cy.get('input[name="password"]').type(pw)
    cy.get('button[type="submit"]').click()
})


Cypress.Commands.add('loginWithGoogle', () => {
    cy.request({
      method: 'POST',
      url: 'https://your-auth-server.com/google-login-endpoint',
      body: {
        // 소셜 로그인 요청에 필요한 데이터 전송
        // 예: client_id, redirect_uri, scope 등
      },
    }).then((response) => {
      // 로그인 프로세스가 완료되면 세션을 설정
      const { access_token } = response.body;
      cy.setCookie('access_token', access_token);
  
      // 로그인 성공 여부 확인을 위한 추가 코드
      cy.visit('/dashboard'); // 로그인 후 리디렉션 페이지로 이동
      cy.url().should('include', '/dashboard'); // 로그인이 성공하면 대시보드 페이지로 이동되어야 함
    });
  });