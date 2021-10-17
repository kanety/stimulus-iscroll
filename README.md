# stimulus-iscroll

A stimulus controller for simple infinite scroll.

## Dependencies

* @hotwired/stimulus 3.0

## Installation

Install from npm:

    $ npm install @kanety/stimulus-iscroll --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import IscrollController from '@kanety/stimulus-iscroll';

const application = Application.start();
application.register('iscroll', IscrollController);
```

Build html as follows:

```html
<div data-controller="iscroll"
     data-iscroll-next-link-value="a.next">
  <table>
    <thead>
      <tr>
        <th>header</th>
        <th>header</th>
      </tr>
    </thead>
    <tbody data-iscroll-target="content">
      <tr>
        <td>content</td>
        <td>content</td>
      </tr>
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
```

### Options

#### loading

Show specific element while loading:

```html
<div data-controller="iscroll">
  <div data-iscroll-target="loading">
    <img src="loading.png">
  </div>
</div>
```

#### next-link

Set selector to get next link in paging target (default is `a.next`):

```html
<div data-controller="iscroll"
     data-iscroll-next-link-value="a.next">
</div>
```

You can set the selector globally:

```javascript
import IscrollController from '@kanety/stimulus-iscroll';
IscrollController.nextLink = 'a.next';
```

#### margin

Set margin height to start loading before reaching at the bottom of scroll bar:

```html
<div data-controller="iscroll"
     data-iscroll-margin-value="20"><!-- 20px -->
</div>
```

### Callbacks

Run callbacks when next page is loaded:

```javascript
let element = document.querySelector('[data-controller="iscroll"]');
element.addEventListener('iscroll:start', e => {
  console.log(e.detail.href);
});
element.addEventListener('iscroll:done', e => {
  console.log(e.detail.href);
  console.log(e.detail.error.content);  // new content element
  console.log(e.detail.error.paging);   // new paging element
});
element.addEventListener('iscroll:fail', e => {
  console.log(e.detail.href);
  console.log(e.detail.error.message);
});
element.addEventListener('iscroll:end', e => {
  console.log(e.detail.href);
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
