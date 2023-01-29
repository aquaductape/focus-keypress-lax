import { Component, onMount } from "solid-js";
import "./focus-keypress-lax";

const App: Component = () => {
  let btn1!: HTMLButtonElement;
  let btn2!: HTMLButtonElement;
  let btn3!: HTMLButtonElement;
  let btn4!: HTMLButtonElement;
  let label!: HTMLLabelElement;
  let div!: HTMLDivElement;

  document.addEventListener("keydown", (e) => {
    if (!["Escape"].includes(e.key)) return;

    btn2.focus();
  });

  onMount(() => {
    div.addEventListener("keydown", (e) => {
      if (!["Escape"].includes(e.key)) return;
      e.stopPropagation();

      setTimeout(() => {
        btn2.focus();
      }, 1000);
    });
  });

  return (
    <div>
      <div>
        <h1 style="font-size: 20px;">focus-keypress-lax</h1>
        <p>
          <strong> Goal:</strong> To not show focus ring for primary mouse only
          users (common ux guy complaint, "looks ugly on my beautiful site, I'll
          just disable all outlines"). But show focus ring for keyboard users,
          for visual indication and accessability.
        </p>
        <p>
          When element is focused if last user action was keypress, attribute
          [data-focus-keypress-lax] is applied.
        </p>
        <p>
          <strong>Note:</strong> if mousedown element is
          input/textarea/[contenteditable], attribute is applied. It's good
          practice for inputs to recieve focus ring even on click/tap.
        </p>

        <p>
          <strong>Why?:</strong> ":focus-visible" does the same thing except it
          falls short when developer or third-party library programmatically
          focuses element `el.focus` causing `:focus-visible` to trigger by
          default, which if we don't want focus ring to show on clicks, it will
          show. Does this mean this library won't add attribute on programmatic
          focus at all?? No if the user's last action of focusing elements was
          by keyboard, then programmatic focus will apply attribute keeping
          continuity.
        </p>
      </div>
      <div>
        <p>
          <strong>How to use: css</strong>
        </p>
        <pre>
          <code>
            {`
*:not(input) {
  outline: none;
}
*[data-focus-keypress-lax] {
  outline: 3px solid red;
}`}
          </code>
        </pre>
        <p>Or you want more specified styling</p>
        <pre>
          <code>
            {`
.btn {
  outline: none;
}
.btn[data-focus-keypress-lax] {
  outline: 3px solid red;
}`}
          </code>
        </pre>
      </div>
      <hr />
      <p>Press Escape key to focus on button "2"</p>
      <div style="padding: 5px; border: 1px solid #000;" tabindex={0} ref={div}>
        Click/Focus inside this div[tabindex="0"] box and press Escape key to
        focus on button "2" after 1 second
      </div>
      <div style="padding: 5px; border: 1px solid #000;" tabindex={0}>
        div tabindex="0"
      </div>
      <div style="padding: 5px; border: 1px solid #000;" tabindex="0">
        div tabindex="0"
        <button ref={btn1}>1</button>
        <button ref={btn2}>2</button>
        <button ref={btn3}>3</button>
        <button ref={btn4}>4</button>
      </div>
      <div class="item">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
          autem.
        </p>
        <button>Click me</button>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
          perferendis corporis enim facilis similique illum tempore doloremque
          omnis repudiandae deleniti.
        </p>
        <input type="text" placeholder="text ..." />
      </div>
      <div>
        <label for="input1" ref={label}>
          Text Label:
        </label>
        <input id="input1" type="text" placeholder="label text..." />
      </div>
      <div>
        <label>
          Text Label (nested, no html for):
          <input type="text" placeholder="label text..." />
        </label>
      </div>
      <div>
        <button>bye</button>
      </div>
      <textarea name="some-text-box" id="foobar" cols="30" rows="10">
        textarea ...
      </textarea>
      <div
        style="padding: 5px; border: 1px solid #000;"
        contenteditable
        tabindex="0"
      >
        div contenteditable
      </div>
      <div>
        <button
          onClick={() => {
            btn1.focus();
          }}
        >
          Click to here to programmatically focus on button "1"
        </button>
      </div>
      <div style="padding: 5px; border: 1px solid #000;" tabindex="0">
        div tabindex="0"
        <button
          onClick={(e) => {
            const target = e.currentTarget;
            target.blur();
            setTimeout(() => {
              btn3.focus();
            }, 1000);
          }}
        >
          Click to here to blur, then programmatically focus on button "3" after
          1 second
        </button>
      </div>
      <div>
        <button
          onClick={(e) => {
            btn4.focus();
          }}
        >
          Click to programmatically focus on button "4"
        </button>
      </div>
      <div>
        <button
          onClick={(e) => {
            label.focus();
          }}
        >
          Click to programmatically focus on text input label
        </button>
      </div>
      {/* <Transition name="fade-slide">
        <Show>
        </Show>
      </Transition> */}
    </div>
  );
};

export default App;
