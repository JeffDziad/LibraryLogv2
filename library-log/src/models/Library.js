export default function Library(obj= null, id="") {
  let l = {
    docId: id,
    ownerUid: "",
    name: "",
    sharedWith: [],
  };

  if(obj) {
    l.ownerUid = obj.ownerUid ? obj.ownerUid : "";
    l.name = obj.name ? obj.name : "";
    l.sharedWith = obj.sharedWith ? obj.sharedWith : [];
  }

  return l;
}
