describe('DynamoDB Table Data', () => {
  it('should have the latest student added', () => {
    
    // Steps for addin a new student from UI
    // cy.get('.student-name').type('radu');
    // cy.get('.student-cnp').type('1870101123456');
    // ...
    // cy.get('.submit-button').click();

    // Use the custom command to search students table for that particular cnp value added in the UI 
    cy.getDynamoDBResults('students', '1870101123456').then((items) => {
      // Log result to see what we have there - can skip this cl.log
      cy.log('DynamoDB Items:', items);
      // Assert that we have the student name 'radu' in DynamoDB
      expect(items[0].nume).to.equal('radu');
    });
  });
});