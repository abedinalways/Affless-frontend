"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"

type propType = {
    onChange?: (date: [Date | undefined, Date | undefined]) => void
    placeHolderText?: string;
    initialDate?: Date;
    startDate?: Date;
    endDate?: Date;
}


export default function DatePicker({ onChange, placeHolderText, initialDate, startDate: propStartDate, endDate: propEndDate }: propType) {
    const [startDate, setStartDate] = useState<Date | undefined>(propStartDate);
    const [endDate, setEndDate] = useState<Date | undefined>(propEndDate);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [activeField, setActiveField] = useState<'start' | 'end' | null>(null);

    // For single date selection
    const handleSingleSelect = (date: Date | undefined) => {
        if (activeField === 'start') {
            setStartDate(date);
            // Optionally clear end date if before new start
            if (endDate && date && endDate < date) {
                setEndDate(undefined);
            }
        } else if (activeField === 'end') {
            setEndDate(date);
            // Optionally clear start date if after new end
            if (startDate && date && startDate > date) {
                setStartDate(undefined);
            }
        }
        setDatePickerOpen(false);
        setActiveField(null);
    };

    // For range selection (default)
    const handleRangeSelect = (range?: DateRange) => {
        if (!range) {
            setStartDate(undefined);
            setEndDate(undefined);
            return false;
        }
        setStartDate(range.from ?? startDate);
        setEndDate(range.to);
        return Boolean(range.to);
    };

    useEffect(() => {
        setStartDate(propStartDate);
    }, [propStartDate]);

    useEffect(() => {
        setEndDate(propEndDate);
    }, [propEndDate]);

    useEffect(() => {
        if (onChange) {
            onChange([startDate, endDate]);
        }
    }, [startDate, endDate]);

    return (
        <div className="flex flex-wrap items-center gap-4">
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="w-fit justify-between font-normal cursor-pointer"
                            onClick={() => { setActiveField('start'); setDatePickerOpen(true); }}
                        >
                            {startDate ? startDate.toLocaleDateString() : "Start Date"}
                        </Button>
                        <Button
                            variant="outline"
                            className="w-fit justify-between font-normal cursor-pointer"
                            onClick={() => { setActiveField('end'); setDatePickerOpen(true); }}
                        >
                            {endDate ? endDate.toLocaleDateString() : "End Date"}
                        </Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    {activeField === 'start' || activeField === 'end' ? (
                        <Calendar
                            mode="single"
                            selected={activeField === 'start' ? startDate : endDate}
                            // Optionally highlight the range visually if your Calendar supports modifiers
                            modifiers={startDate && endDate ? { selectedRange: { from: startDate, to: endDate } } : undefined}
                            captionLayout="dropdown"
                            disabled={{ after: new Date() }}
                            onSelect={handleSingleSelect}
                        />
                    ) : (
                        <Calendar
                            mode="range"
                            selected={
                                startDate || endDate
                                    ? { from: startDate, to: endDate }
                                    : undefined
                            }
                            captionLayout="dropdown"
                            disabled={{ after: new Date() }}
                            onSelect={(range) => {
                                const isRangeComplete = handleRangeSelect(range);
                                if (isRangeComplete) {
                                    setDatePickerOpen(false);
                                    setActiveField(null);
                                }
                            }}
                        />
                    )}
                </PopoverContent>
            </Popover>
        </div>
    )
}
