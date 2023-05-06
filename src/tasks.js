export default function clearCompleted(list) {
  return list.filter((task) => !task.completed);
}