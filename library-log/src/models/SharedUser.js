export default function SharedUser(obj=null, id="") {
  let u = {
    docId: "",
    email: "",
  };

  if(obj) {
    u.email = obj.email ? obj.email : "";
  }

  return u;
}
