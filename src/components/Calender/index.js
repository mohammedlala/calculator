import React from 'react';
import {
	format,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	addDays,
	endOfWeek,
	isSameDay,
	isSameMonth,
	addMonths,
	subMonths,
} from 'date-fns';
import './calender.css';

class Calendar extends React.Component {
	state = {
		currentMonth: new Date(this.props.date),
		selectedDate: new Date(this.props.date),
	};

	renderHeader() {
		const dateFormat = 'MMMM yyyy';

		return (
			<div className='header row flex-middle'>
				<div className='col col-center'>
					<span>{format(this.state.currentMonth, dateFormat)}</span>
				</div>
			</div>
		);
	}

	renderDays() {
		const dateFormat = 'eeeeee';
		const days = [];

		let startDate = startOfWeek(this.state.currentMonth);

		for (let i = 0; i < 7; i++) {
			days.push(
				<div className='col col-center' key={i}>
					{format(addDays(startDate, i), dateFormat)}
				</div>,
			);
		}

		return <div className='days row'>{days}</div>;
	}

	renderCells() {
		const { currentMonth, selectedDate } = this.state;
		const monthStart = startOfMonth(currentMonth);
		const monthEnd = endOfMonth(monthStart);
		const startDate = startOfWeek(monthStart);
		const endDate = endOfWeek(monthEnd);

		const dateFormat = 'd';
		const rows = [];

		let days = [];
		let day = startDate;
		let formattedDate = '';

		while (day <= endDate) {
			for (let i = 0; i < 7; i++) {
				formattedDate = format(day, dateFormat);
				days.push(
					<div
						className={`col cell ${
							!isSameMonth(day, monthStart)
								? 'disabled'
								: isSameDay(day, selectedDate)
								? 'selected'
								: ''
						}`}
						key={day}
					>
						<span className='number'>{formattedDate}</span>
					</div>,
				);
				day = addDays(day, 1);
			}
			rows.push(
				<div className='row' key={day}>
					{days}
				</div>,
			);
			days = [];
		}
		return <div className='body'>{rows}</div>;
	}

	nextMonth = () => {
		this.setState({
			currentMonth: addMonths(this.state.currentMonth, 1),
		});
	};

	prevMonth = () => {
		this.setState({
			currentMonth: subMonths(this.state.currentMonth, 1),
		});
	};

	render() {
		return (
			<div className='calendar'>
				{this.renderHeader()}
				{this.renderDays()}
				{this.renderCells()}
			</div>
		);
	}
}

export default Calendar;
