describe('error', () => {
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
    fetch.mockReject(new Error('Fatal Error'));
  });

  let message;
  beforeEach((done) => {
    $('[data-controller="iscroll"]').addEventListener('iscroll:fail', e => {
      message = e.detail.error.message;
      done();
    });
    $('[data-controller="iscroll"]').dispatchEvent(new Event('scroll'));
  });

  it('loads next page', () => {
    expect(message).toEqual('Fatal Error');
  });
});
