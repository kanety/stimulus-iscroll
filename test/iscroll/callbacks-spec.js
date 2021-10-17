const fs = require('fs');

describe('callbacks', () => {
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

  let messages = [];
  beforeEach((done) => {
    $('[data-controller="iscroll"]').addEventListener('iscroll:start', e => {
      messages.push('start');
    });
    $('[data-controller="iscroll"]').addEventListener('iscroll:end', e => {
      messages.push('end');
      done();
    });
    $('[data-controller="iscroll"]').addEventListener('iscroll:done', e => {
      messages.push('done');
    });
    $('[data-controller="iscroll"]').addEventListener('iscroll:fail', e => {
      messages.push('fail');
    });
    $('[data-controller="iscroll"]').dispatchEvent(new Event('scroll'));
  });

  it('runs callbacks', () => {
    expect(messages).toEqual(['start', 'done', 'end']);
  });
});
