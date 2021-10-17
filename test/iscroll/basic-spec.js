const fs = require('fs');

describe('basic', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="iscroll" data-action="scroll->iscroll#run">
        <table>
          <thead>
            <tr><th>header</th><th>header</th></tr>
          </thead>
          <tbody data-iscroll-target="content">
            <tr><td>page1</td><td>page1</td></tr>
            <tr><td>page1</td><td>page1</td></tr>
            <tr><td>page1</td><td>page1</td></tr>
          </tbody>
        </table>
        <div style="display: none;" data-iscroll-target="paging">
          <a class="prev">prev</a>
          <a href="index.1.html">index.1.html</a>
          <a href="index.2.html">index.2.html</a>
          <a href="index.3.html">index.3.html</a>
          <a href="index.2.html" class="next">next</a>
        </div>
        <div style="display: none;" data-iscroll-target="loading"></div>
      </div>
    `;
  });

  beforeEach(() => {
    mockElement($('[data-controller="iscroll"]'), {
      scrollTop: 100,
      scrollHeight: 100,
      clientHeight: 100
    });
    fetch.resetMocks();
    fetch.mockResponses([fs.readFileSync('examples/index.2.html', 'utf-8'), { status: 200 }]);
  });

  beforeEach((done) => {
    $('[data-controller="iscroll"]').addEventListener('iscroll:end', e => {
      done();
    });
    $('[data-controller="iscroll"]').dispatchEvent(new Event('scroll'));
  });

  it('loads next page', () => {
    expect($$('tbody > tr').length).toBeGreaterThan(3);
  });
});
