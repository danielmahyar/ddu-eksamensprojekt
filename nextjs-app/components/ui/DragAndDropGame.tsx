import { GetServerSidePropsContext, NextPage } from 'next'
import React, { useCallback, useState } from 'react'
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import styled from "@emotion/styled";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	resetServerContext()
	return { props: { data: [] } }
}

const initial = [')', '2', '*', 'O', 'H', ')', '(', '(', '+', 'ΔH', '=', ')', '(', 'H2O', '(', ')', '-'].map((k, i) => {
	const custom: any = {
		id: `id-${i}`,
		content: `${k}`
	};

	return custom;
});

const grid = 8;
const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const QuoteItem = styled.div`
  width: fit;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
`;

function Quote({ quote, index }: any) {
	return (
		<div className="flex">
			<Draggable draggableId={quote.id} index={index}>
				{provided => (
					<QuoteItem
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						{quote.content}
					</QuoteItem>
				)}
			</Draggable>
		</div>
	);
}

const getListStyle = (isDraggingOver: boolean) => ({
	background: 'lightgrey',
	display: 'flex',
	padding: grid,
	overflow: 'auto',
});

const QuoteList = React.memo(function QuoteList({ quotes }: any) {
	return quotes.map((quote: any, index: number) => (
		<Quote quote={quote} index={index} key={quote.id} />
	));
});

const DragAndDropGame = () => {
	const [state, setState] = useState<any>({ quotes: initial });

	function onDragEnd(result: any) {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const quotes: any[] = reorder(
			state.quotes,
			result.source.index,
			result.destination.index
		);

		setState({ quotes });
	}
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="dawda" direction='horizontal'>
				{(provided, snapshot) => (
					<div style={getListStyle(snapshot.isDraggingOver)} ref={provided.innerRef} {...provided.droppableProps}>
						<QuoteList quotes={state.quotes} />
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default DragAndDropGame