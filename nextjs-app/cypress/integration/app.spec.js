describe('Navigation', () => {
	it('should navigate to the about page', () => {
	  // Start from the index page
	  cy.visit('/')

	  cy.get('h1').contains('Hello world')

   
	})
   })