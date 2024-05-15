pm.test('Response status code is 400 when title is missing', () => {
    pm.response.to.have.status(400);
});

pm.test('Response body contains error message about missing title', () => {
    pm.expect(pm.response.text()).to.include('Invalid book data. Must provide title');
});

// ---

pm.test('Response status code is 422 when lending a non-existent book', () => {
    pm.response.to.have.status(422);
});

pm.test('Response body contains error message about non-existent book', () => {
    pm.expect(pm.response.text()).to.include('Book not found');
});

// ---

pm.test('Response status code is 422 when borrowing the same book again', () => {
    pm.response.to.have.status(422);
});

pm.test('Response body contains error message about already borrowed book', () => {
    pm.expect(pm.response.text()).to.include('Book already borrowed');
});

