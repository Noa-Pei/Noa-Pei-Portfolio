export function ContactPage() {
    return (
      <div className="py-5 text-center container">
        <h1>Contact</h1>
        <h3 className="textDesign">Send us a message!</h3>
        <form className="adminForm">

          <label htmlFor="name" className="textDesign">Name</label>
          <input id="name" type="text" />

          <label htmlFor="email" className="textDesign">Email</label>
          <input id="email" type="email" />

          <label htmlFor="message" className="textDesign">Message</label>
          <textarea id="message" />

          <button className="btn btn-info my-2" type="submit">Send</button>

        </form>
      </div>
    );
  };