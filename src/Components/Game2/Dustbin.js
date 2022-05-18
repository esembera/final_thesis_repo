import { useDrop } from 'react-dnd'
const style = {
  height: '85px',
  width: '65px',
  color: 'white',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  borderRadius: '5px',
  margin: '1.5rem auto'
}
export const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'option',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      {isActive ? 'Otpusti za odabir' : 'Povuci rješenje ovdje!'}
    </div>
  )
}