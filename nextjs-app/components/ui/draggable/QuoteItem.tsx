import React from 'react';
import styled from '@emotion/styled';
import { borderRadius, grid, Quote } from '../../../types/DraggableTypes';
import type { DraggableProvided } from 'react-beautiful-dnd';

type Props = {
	quote: Quote,
	isDragging: boolean,
	provided: DraggableProvided,
	isClone?: boolean,
	isGroupedOver?: boolean,
	style?: Object,
	index?: number,
};

const getBorderColor = (isDragging: boolean) =>
	isDragging ? 'black' : 'transparent';

const imageSize: number = 40;

const CloneBadge = styled.div`
  background: green;
  bottom: ${grid / 2}px;
  border: 2px solid yellow;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);
  height: ${imageSize}px;
  width: ${imageSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.a`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;
  /* anchor overrides */
  &:hover,
  &:active {
    text-decoration: none;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
  /* flexbox */
  display: flex;
`;

const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`

`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

const Author = styled.small`
  flex-grow: 0;
  margin: 0;
  border-radius: ${borderRadius}px;
  font-weight: normal;
  padding: ${grid / 2}px;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;

function getStyle(provided: DraggableProvided, style: any) {
	if (!style) {
		return provided.draggableProps.style;
	}

	return {
		...provided.draggableProps.style,
		...style,
	};
}

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function QuoteItem(props: Props) {
	const {
		quote,
		isDragging,
		isGroupedOver,
		provided,
		style,
		isClone,
		index,
	} = props;

	return (
		<Container
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
		>
			{isClone ? <CloneBadge>Clone</CloneBadge> : null}
			<Content>
				<BlockQuote>{quote.content}</BlockQuote>
				<Footer>
					<QuoteId>id:{quote.id}</QuoteId>
				</Footer>
			</Content>
		</Container>
	);
}

export default React.memo<Props>(QuoteItem);