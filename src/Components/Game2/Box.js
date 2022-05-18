import { useDrag } from 'react-dnd'
import { Card } from 'primereact/card'
const style = {
  backgroundColor: 'white',
  padding: '4px',
  cursor: 'move',
  float: 'left',
  width: '61px'
}
export const Box = function Box({ title }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "option",
    item: { title },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert(`You dropped ${item.title} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1
  return (
    <div ref={drag} style={{ ...style, opacity }} data-testid={`box`}>
      <Card title = {title}/>
    </div>
  )
}