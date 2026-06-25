'use client'

import { useState, useRef, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from '../operation-deadlight.module.css'

interface EventItem {
  id: string
  text: string
  key: string
  correctIndex: number
}

const EVENTS_CORRECT: EventItem[] = [
  { id: 'e1', text: 'Orders issued. Task force assembled for deployment.', key: 'O', correctIndex: 0 },
  { id: 'e2', text: 'Unit arrives at Site Kennedy perimeter. Briefing held.', key: 'U', correctIndex: 1 },
  { id: 'e3', text: 'Three residents report unusual behavior to personnel.', key: 'T', correctIndex: 2 },
  { id: 'e4', text: 'Breach of containment protocols detected in Sector 3.', key: 'B', correctIndex: 3 },
  { id: 'e5', text: 'Radio signal corruption begins. Origin unlocatable.', key: 'R', correctIndex: 4 },
  { id: 'e6', text: 'Evacuation of non-essential personnel ordered.', key: 'E', correctIndex: 5 },
  { id: 'e7', text: 'All exits sealed. No further movement permitted.', key: 'A', correctIndex: 6 },
  { id: 'e8', text: 'Keyed transmission received. Communication ends.', key: 'K', correctIndex: 7 },
]

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function SortableEvent({ event, index, status }: {
  event: EventItem
  index: number
  status: 'none' | 'correct' | 'wrong'
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: event.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${styles.sortableEvent} ${
        status === 'correct' ? styles.sortableCorrect :
        status === 'wrong' ? styles.sortableWrong : ''
      }`}
    >
      <span className={styles.sortableIndex}>{index + 1}</span>
      <span className={styles.sortableKey}>[{event.key}]</span>
      <p className={styles.sortableText}>{event.text}</p>
      <span className={styles.sortableHandle}>⠿</span>
    </div>
  )
}

export function TimelineSort({ onSolved }: { onSolved: () => void }) {
  const [items, setItems] = useState<EventItem[]>([])
  const [validation, setValidation] = useState<Record<string, 'correct' | 'wrong'>>({})
  const [solved, setSolved] = useState(false)
  const [revealLines, setRevealLines] = useState<string[]>([])
  const hasInitialized = useRef(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  )

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      // Shuffle until not in correct order
      let shuffled = shuffleArray(EVENTS_CORRECT)
      while (shuffled.every((item, i) => item.correctIndex === i)) {
        shuffled = shuffleArray(EVENTS_CORRECT)
      }
      setItems(shuffled)
    }
  }, [])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setItems(prev => {
      const oldIndex = prev.findIndex(item => item.id === active.id)
      const newIndex = prev.findIndex(item => item.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
    // Clear validation on reorder
    setValidation({})
  }

  async function handleVerify() {
    const newValidation: Record<string, 'correct' | 'wrong'> = {}
    let allCorrect = true
    items.forEach((item, index) => {
      if (item.correctIndex === index) {
        newValidation[item.id] = 'correct'
      } else {
        newValidation[item.id] = 'wrong'
        allCorrect = false
      }
    })
    setValidation(newValidation)

    if (allCorrect) {
      setSolved(true)
      const lines = [
        '> SEQUENCE ACCEPTED',
        '> FIRST LETTERS EXTRACTED: O-U-T-B-R-E-A-K',
        '> CLASSIFICATION CODE: OUTBREAK',
        '> ANALYST DOLEN WAS RIGHT.',
        '> THE MEMORY WAS NOT FAILING.',
        '> IT WAS BEING REWRITTEN.',
      ]
      for (let i = 0; i < lines.length; i++) {
        await new Promise(r => setTimeout(r, 400))
        setRevealLines(prev => [...prev, lines[i]])
      }
      setTimeout(onSolved, 2000)
    }
  }

  if (solved) {
    return (
      <div className={styles.crtTerminal}>
        <div className={styles.crtScanlines} />
        <div className={styles.terminalOutput}>
          {revealLines.map((line, i) => (
            <p key={i} className={line.includes('OUTBREAK') ? styles.tracingHighlight : ''}>
              {line}
            </p>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.timelineSortContainer}>
      <p className={styles.sortInstruction}>
        INCIDENT TIMELINE RECONSTRUCTION — Drag events into correct chronological order.
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className={styles.sortableList}>
            {items.map((item, index) => (
              <SortableEvent
                key={item.id}
                event={item}
                index={index}
                status={validation[item.id] ?? 'none'}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button onClick={handleVerify} className={styles.verifyBtn}>
        VERIFY SEQUENCE
      </button>
    </div>
  )
}

