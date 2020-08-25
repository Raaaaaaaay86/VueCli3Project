export default function (unit) {
    switch (unit){
        case 'nail':
            unit = '指彩';
            return '指彩';
            break;
        case 'lip':
            unit = '唇彩';
            return '唇彩';
            break;
        case 'blush':
            unit = '腮紅';
            return '腮紅';
            break;   
    }
}