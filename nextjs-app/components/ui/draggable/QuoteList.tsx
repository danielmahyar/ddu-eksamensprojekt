// @flow
import React from 'react';
import styled from '@emotion/styled';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import QuoteItem from './QuoteItem';
import { grid, Quote } from '../../../types/DraggableTypes';
import type {
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';


const Wrapper = styled.div`
  display: flex;
  
  padding: ${grid}px;
  border: ${grid}px;
  background-color: red;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: w-auto;
`;

const scrollContainerHeight: number = 250;

const DropZone = styled.div`
  display: flex;
  /*
    Needed to avoid growth in list due to lifting the first item
    Caused by display: inline-flex strangeness
  */
  align-items: start;
  /* stop the list collapsing when empty */
  min-width: 600px;
  /* stop the list collapsing when it has no items */
  min-height: 60px;
`;

const ScrollContainer = styled.div`
overflow: auto;

`;

/* stylelint-disable block-no-empty */
const Container = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    flex parent
    needed to allow width to grow greater than body
  */
  display: inline-flex;
`;
/* stylelint-enable */

type Props = {
  listId?: string,
  listType?: string,
  quotes: Quote[],
  title?: string,
  internalScroll?: boolean,
  scrollContainerStyle?: Object,
  isDropDisabled?: boolean,
  isCombineEnabled?: boolean,
  style?: Object,
  // may not be provided - and might be null
  ignoreContainerClipping?: boolean,

  useClone?: boolean,
};

type QuoteListProps = {
  quotes: Quote[],
};

const InnerQuoteList = React.memo(function InnerQuoteList(
  props: QuoteListProps,
): any {
  return props.quotes.map((quote: Quote, index: number) => (
    <Draggable key={quote.id} draggableId={quote.id} index={index}>
      {(
        dragProvided: DraggableProvided,
        dragSnapshot: DraggableStateSnapshot,
      ) => (
        <QuoteItem
          key={quote.id}
          
          quote={quote}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
});

type InnerListProps = {
  dropProvided: DroppableProvided,
  quotes: Quote[],
};

function InnerList(props: InnerListProps) {
  const { quotes, dropProvided } = props;

  return (
    <Container>
      <DropZone ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

export default function QuoteList(props: Props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    quotes,
    title,
    useClone,
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      direction="horizontal"
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
    >
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
      ) => (
        <Wrapper>
          {internalScroll ? (
            <ScrollContainer style={scrollContainerStyle}>
              <InnerList
                quotes={quotes}
                dropProvided={dropProvided}
              />
            </ScrollContainer>
          ) : (
            <InnerList
              quotes={quotes}
              dropProvided={dropProvided}
            />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}