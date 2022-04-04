// @flow
/* eslint-disable no-console */
import React, { useState, useCallback, useEffect } from 'react';
import {
  DropResult,
  PreDragActions,
  SnapDragActions,
  SensorAPI,
  DragDropContext
} from 'react-beautiful-dnd';
import { Quote } from '../../../types/DraggableTypes';
import QuoteList from './QuoteList';
import reorder from './reorder';

function delay(fn: Function, time = 100) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, time);
  });
}

function noop() {}

function useDemoSensor(api: SensorAPI) {

  const start = useCallback(
    async function start() {
      const preDrag = api.tryGetLock('id-0', noop);

      if (!preDrag) {
        console.warn('unable to start drag');
        return;
      }
      console.warn('starting drag');

      const actions: SnapDragActions = preDrag.snapLift();
      const { moveLeft, drop, moveRight } = actions;

      await delay(moveRight);
      await delay(moveRight);
      await delay(moveRight);
      await delay(moveRight);
      await delay(moveRight);
      await delay(moveRight);
      await delay(moveRight);
      await delay(moveRight);
      await delay(moveRight);
      await delay(moveLeft);
      await delay(moveLeft);
      await delay(drop);
    },
    [api],
  );

  useEffect(() => {
    start();
  }, [start]);
}

type Props = {
  initial: Quote[],
};

export default function DragAndDropGame(props: Props) {
  const [quotes, setQuotes] = useState(props.initial);
  console.log(quotes)

  const onDragEnd = useCallback(
    function onDragEnd(result: DropResult) {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      const newQuotes = reorder(
        quotes,
        result.source.index,
        result.destination.index,
      );

      setQuotes(newQuotes);
    },
    [quotes],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd} sensors={[useDemoSensor]}>
      <QuoteList listId="list" quotes={quotes} />
    </DragDropContext>
  );
}