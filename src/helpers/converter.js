export function golangDateConvert(datestr) {
  let convertMonth = month => {
    switch (month) {
      case 0:
        return 'Januari';
      case 1:
        return 'Februari';
      case 2:
        return 'Maret';
      case 3:
        return 'April';
      case 4:
        return 'Mei';
      case 5:
        return 'Juni';
      case 6:
        return 'Juli';
      case 7:
        return 'Agustus';
      case 8:
        return 'September';
      case 9:
        return 'Oktober';
      case 10:
        return 'November';
      case 11:
        return 'Desember';
      default:
        return 'Unknown';
    }
  };

  let datesplit = datestr.split('-');
  let year = datesplit[0];
  let month = convertMonth(parseInt(datesplit[1]) - 1);
  let date = datesplit[2].split('T')[0];

  return `${date} ${month} ${year}`;
}

export function milisToDate(milis) {
  let date = new Date(milis);
  let convertMonth = month => {
    switch (month) {
      case 0:
        return 'Januari';
      case 1:
        return 'Februari';
      case 2:
        return 'Maret';
      case 3:
        return 'April';
      case 4:
        return 'Mei';
      case 5:
        return 'Juni';
      case 6:
        return 'Juli';
      case 7:
        return 'Agustus';
      case 8:
        return 'September';
      case 9:
        return 'Oktober';
      case 10:
        return 'November';
      case 11:
        return 'Desember';
      default:
        return 'Unknown';
    }
  };

  let dateNumber = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return `${dateNumber} ${convertMonth(date.getMonth())} ${date.getFullYear()}`;
}
