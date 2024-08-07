import Miembro from "./Miembro";

export default function Staff({staff, user}) {
  return !staff ? <h1 className="titulo">No hay datos</h1> :
  staff.map(membr=>(
    <Miembro key={membr._id} membr={membr} user={user} />
  ))
}
