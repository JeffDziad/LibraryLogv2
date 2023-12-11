export default function Library(obj={}, id="") {
  let l = {
    docId: id,
    ownerUid: "",
    name: "",
    items: [],
    sharedWith: [],
  };

  if(obj) {
    l.ownerUid = obj.ownerUid ? obj.ownerUid : "";
    l.name = obj.name ? obj.name : "";
    l.items = obj.items ? obj.items : [];
    l.sharedWith = obj.sharedWith ? obj.sharedWith : [];
  }

  return l;
}
