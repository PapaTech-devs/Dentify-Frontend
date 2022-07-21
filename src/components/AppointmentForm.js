export default function AppointmentForm({ setPatientData }) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Submit");
        }}
      >
        <input
          type="text"
          placeholder="Patient"
          name="Patient"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
