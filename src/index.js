import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['content', 'paging', 'loading'];
  static values = {
    nextLink: String,
    margin: { type: Number, default: 5 }
  };

  static nextLink = 'a.next';

  run(e) {
    let target = e.target == document || e.target == window ? document.documentElement : this.element
    if (this.scrolled(target)) this.load();
  }

  scrolled(element) {
    let scrollTop = element.scrollTop;
    let scrollHeight = element.scrollHeight;
    let contentHeight = element.clientHeight;
    return scrollTop + contentHeight + this.marginValue >= scrollHeight;
  }

  load() {
    let link = this.pagingTarget.querySelector(this.nextLinkValue || this.constructor.nextLink);
    if (!link) return;

    this.nextHref = link.getAttribute('href');
    if (!this.nextHref) return;

    if (this.loading) return;

    this.fetch();
  }

  fetch() {
    this.start();
    fetch(this.nextHref).then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    }).then(html => {
      this.done(html);
    }).catch(error => {
      this.fail(error);
    }).then(() => {
      this.end();
    });
  }

  start() {
    this.toggleLoading(true);
    this.dispatch('start', { detail: { href: this.nextHref } });
  }

  end() {
    this.toggleLoading(false);
    this.dispatch('end', { detail: { href: this.nextHref } });
  }

  done(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    let content = doc.querySelector(`[data-${this.identifier}-target="content"]`);
    let paging = doc.querySelector(`[data-${this.identifier}-target="paging"]`);

    this.contentTarget.insertAdjacentHTML('beforeend', content.innerHTML);
    this.pagingTarget.innerHTML = paging.innerHTML;

    this.dispatch('done', { detail: { href: this.nextHref, content: content, paging: paging, html: html } });
  }

  fail(error) {
    this.dispatch('fail', { detail: { href: this.nextHref, error: error } });
  }

  toggleLoading(loading) {
    this.loading = loading;
    if (this.hasLoadingTarget) {
      this.loadingTarget.style.display = loading ? '' : 'none';
    }
  }
}
