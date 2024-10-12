
  import * as React from 'react';
  import { useSelector } from 'react-redux';
  import Timeline from '@mui/lab/Timeline';
  import TimelineItem from '@mui/lab/TimelineItem';
  import TimelineSeparator from '@mui/lab/TimelineSeparator';
  import TimelineConnector from '@mui/lab/TimelineConnector';
  import TimelineContent from '@mui/lab/TimelineContent';
  import TimelineDot from '@mui/lab/TimelineDot';
  import TimelineOppositeContent, {
    timelineOppositeContentClasses,
  } from '@mui/lab/TimelineOppositeContent';
  import Box from '@mui/material/Box';
  import { basketState } from '../Redux/BasketSlice';
  
  export default function LeftAlignedTimeline() {
    const changeHistory = useSelector((state) => basketState(state).changeHistory);
  
    // محدود کردن نام به دو کلمه اول
    const getFirstTwoWords = (text) => {
      const words = text.split(' ');
      return words.slice(0, 2).join(' '); // گرفتن دو کلمه اول
    };
  
    // گروه‌بندی تغییرات بر اساس دو کلمه اول و نوع اقدام
    const groupedChanges = changeHistory.reduce((acc, change) => {
      const lastGroup = acc[acc.length - 1];
  
      // شناسایی دسته‌بندی بر اساس دو کلمه اول نام
      const category = (() => {
        const firstTwoWords = getFirstTwoWords(change.name);
        if (firstTwoWords.includes('پیتزا')) return 'پیتزا';
        if (firstTwoWords.includes('برگر')) return 'برگر';
        if (firstTwoWords.includes('ساندویچ')) return 'ساندویچ';
        if (firstTwoWords.includes('سوخاری')) return 'سوخاری';
        if (firstTwoWords.includes('پاستا')) return 'پاستا';
        return 'سایر'; // برای موارد دیگر
      })();
  
      // اگر آخرین گروه با تغییر فعلی مطابقت داشته باشد، به آن گروه اضافه کنید
      if (lastGroup && lastGroup.name === change.name && lastGroup.action === change.action) {
        lastGroup.count += 1; // تعداد را افزایش دهید
      } else {
        // در غیر این صورت، گروه جدیدی ایجاد کنید
        acc.push({ count: 1, name: change.name, action: change.action, category });
      }
      return acc;
    }, []);
  
    return (
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '16px',
          boxSizing: 'border-box',
        }}
      >
        {groupedChanges.map(({ count, name, action, category }, index) => (
          <TimelineItem
            key={index}
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: '600px' },
              marginBottom: '16px',
            }}
          >
            <TimelineContent sx={{ textAlign: 'center', flex: 1 }}>
              {category} 
            </TimelineContent>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: action === 'اضافه شد' ? 'green' : 'red',
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineOppositeContent color="textSecondary" sx={{ textAlign: 'center', flex: 1 }}>
              <Box
                sx={{
                  backgroundColor: action === 'حذف شد' ? 'error.main' : 'success.main',
                  color: 'white',
                  width: { xs: '110px', sm: '270px' },
                  height: { xs: '70px', sm: '60px' },
                  borderRadius: '4px',
                  margin: '0 auto',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding:'2px'
                }}
              >
                {count} عدد {name} - {action}
              </Box>
            </TimelineOppositeContent>
          </TimelineItem>
        ))}
      </Timeline>
    );
  }
  