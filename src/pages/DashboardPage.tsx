import React from 'react';
import { RoadmapMap } from '../components/quest-map/RoadmapMap';
import { DayLesson } from '../core/types/curriculum';

export const DashboardPage: React.FC<{ onSelectDay: (day: DayLesson) => void }> = ({ onSelectDay }) => {
  return (
    <div className="flex flex-col">
      <RoadmapMap onSelectDay={onSelectDay} />
    </div>
  );
};
