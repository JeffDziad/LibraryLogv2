export default function SharedUser(obj=null, id="") {
  let u = {
    email: "",
  };

  if(obj) {
    u.email = obj.email ? obj.email : "";
  }

  return u;
}
