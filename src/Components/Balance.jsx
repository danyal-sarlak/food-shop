
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Balance() {
  const changeHistory = useSelector(state => state.basket.changeHistory);
  const basketItems = useSelector(state => state.basket.items);
  const [prevTime, setPrevTime] = useState(null);
  const [addedItems, setAddedItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);

  // محاسبه مجموع قیمت سبد خرید
  const totalPrice = basketItems.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const countItems = (changes, action) => {
    const itemMap = {}; //یک شی برای ذخیره آیتم ها
    changes.forEach(change => {
      if (itemMap[change.name]) {
        itemMap[change.name].count += 1;
      } else {
        itemMap[change.name] = { ...change, count: 1 };
      }
    });
    return Object.values(itemMap); // تبدیل به آرایه
  };

  const handleApplyChanges = () => {
    const currentTime = new Date();
    const filteredChanges = changeHistory.filter(change => {
      const changeTime = new Date(change.timestamp); //زمان ان تغییر را ذخیره میکنیم changeHistoryبرای هر تغییر در 
      return prevTime ? changeTime >= prevTime && changeTime <= currentTime : true;
    });

    const added = countItems(filteredChanges.filter(change => change.action === 'اضافه شد'));
    const removed = countItems(filteredChanges.filter(change => change.action === 'حذف شد'));

    setAddedItems(added);
    setRemovedItems(removed);
    setPrevTime(currentTime);
  };

  return (
    <div className='px-3  pt-4'>
      <h2 className='text-lg  pb-2 font-bold'>تاریخچه تغییرات سبد خرید</h2>
     

      <div className='my-2'>
      <h3 className='text-md font-bold mb-2 text-green-600'>آیتم‌های اضافه‌شده</h3>
        {addedItems.length > 0 ? ( // نمایش آیتم‌های اضافه‌شده
          <>
           
            {addedItems.map((change, index) => (
              <div key={index} className='border-l-4 border-green-600 pl-2 mb-2 p-2 bg-green-50 rounded-md flex flex-col md:flex-row md:items-center'>
                {change.image && <img src={change.image} alt={change.name} className='w-20 h-20 md:w-12 md:h-12 rounded-md mr-2 mb-2 md:mb-0' />} {/* نمایش تصویر */} 
                <p className='text-green-800 pr-2 font-medium'>
                  {change.name} ({change.count} عدد) {change.action} 
                </p>
              </div>
            ))}
          </>
        ) : (
          <div className='border-l-4 border-green-600 pl-2 mb-2 p-2 bg-green-50 rounded-md'>
            <p className='text-green-800 font-medium'>
              هیچ آیتمی اضافه نشده
            </p>
          </div>
        )}
        <h3 className='text-md font-bold mt-6 mb-2 text-red-600'>آیتم‌های حذف‌شده</h3>

        {removedItems.length > 0 ? ( // نمایش آیتم‌های حذف‌شده
          <>
            
            {removedItems.map((change, index) => (
              <div key={index} className='border-l-4 border-red-600 pl-2 mb-2 p-2 bg-red-50 rounded-md flex flex-col md:flex-row md:items-center'>
                {change.image && <img src={change.image} alt={change.name} className='w-20 h-20 md:w-10 md:h-10 mr-2 mb-2 md:mb-0' />} {/* نمایش تصویر */}
                <p className='text-red-800 pr-2 font-medium'>
                  {change.name} ({change.count} عدد) {change.action} 
                </p>
              </div>
            ))}
          </>
        ) : (
          <div className='border-l-4 border-red-600 pl-2 mb-2 p-2 bg-red-50 rounded-md'>
            <p className='text-red-800 font-medium'>
              هیچ آیتمی حذف نشده
            </p>
          </div>
        )}
      </div>

      {/* نمایش مجموع قیمت سبد خرید */}
      <div className='my-4 border-t-2 border-gray-400'>
        <h3 className='text-md font-bold mb-2 text-blue-600'>مجموع قیمت سبد خرید:</h3>
        <div className='border-l-4 border-blue-600 pl-2 mb-2 p-2 bg-blue-50 rounded-md'>
          <p className='text-blue-800 font-medium'>
            {totalPrice.toLocaleString('fa-IR')} تومان
          </p>
        </div>
      </div>
      <button
        onClick={handleApplyChanges}
        className='mb-4 p-2 w-full bg-yellow-600 text-white rounded hover:bg-yellow-700 transition duration-300'
      >
        اعمال تغییرات در سبد خرید
      </button>
    </div>
  );
}
