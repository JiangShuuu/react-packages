const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Iook dinner' },
    'task-5': { id: 'task-5', content: 'Dook dinner' },
    'task-6': { id: 'task-6', content: 'Eook dinner' },
    'task-7': { id: 'task-7', content: 'Fook dinner' },
    'task-8': { id: 'task-8', content: 'Gook dinner' },
    'task-9': { id: 'task-9', content: 'Hook dinner' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: [
        'task-1',
        'task-2',
        'task-3',
        'task-4',
        'task-5',
        'task-6',
        'task-7',
        'task-8',
        'task-9',
      ],
    },
  },
  columnOrder: ['column-1'],
}

export default initialData
