
export default function ProgressBar({ disp, value }) {
  // console.log(value)
  return (

    <div className="h-full rounded-sm bg-gradient-to-r from-cyan-950 to-cyan-700"
      style={{ width: value + "%" }} >
    </div>
  )
}
