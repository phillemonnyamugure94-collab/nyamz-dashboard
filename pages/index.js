import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const LOGO_B64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCACMAUADASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAYHBAUIAwIB/8QAThAAAQQBAgIGBgMMBgcJAAAAAQACAwQFBhESIQcTMUFRkRUiU2Fx0RRCgRYjMjNVYnKTobGywRckNTdSczZDdIKSoqMYJjRFVmN1lPH/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBQQG/8QALREAAgIBAwIFAwMFAAAAAAAAAAECAxEEEiEFMRMiMkFRFGFxgZHwI0JSobH/2gAMAwEAAhEDEQA/AL/REQBF8uJA3A3PgoTmdbZzDSuDtEZSzCDymrzMkBHjs3chTGLk8IZJvxDfbfmvmSVkUT5HnZrGlzjtvsAqTz2tdF6qLItQY/NYO8z1Y7fVlro/cS3tHxCy9OV9TVpWO01r3F52jvyq35Dx8Ph3uBWvgtLL4/nyV3Fq43N4vMRmTHX69oDt6qQOLfiO0L6yGXx+KbE6/birMmf1bHyu4Wl3hv2Kt9V9FtnKWmZ7ATsxGd245o4pCI3v8Q4AEH37bHwWisavuwYuXSvSdip44JxwMyMbOLcjsdy5EjxHP3KVUpcxef8AozjuXg17XsDmuBaRuCDuCvrcKltJ0tW6SME2Dtxap0xM7YMglAfGPEBx9UjwB29wW91p0hX9F6wxrbVbrMHcrgvHDs+N4d6xB9wI3Cq6nu2x5JzwWYi8KlqG7Uis15GyQytD2Pb2OB7CvdZEhERAfm+3Nal2qcCx5Y7MUWuB2IM7eRW0d+A74LlfIDfJWuQ/HP8A4isrbHDB0en6KOqclJ4wdRU79TIQ9dTsxWIt9uOJ4cN/sWRuuedGars6RzBjsB/0KVwbYiI5t/OA8R+0K/4LMNuoyxBI2SKRvE17TuCCprsU0Z6zRy008d0+zNe7VOAY8tdmaIcDsQZ28is05KkKH0824fonDxddxDg28d1y/d29IWeX+tf/ABFdB6MrxWuj/FwTRtfFJVDXscORB33Va7XJtG+t0ENNXGabeTP+6vT++3pqh+vb81tmSMkY17HBzHDcEHkQudNa6VfpfMuia0upTEurvI7v8J94Vi9FWqDfxz8Nak3sVRvESebo/D7Eja3LbJDUdPjGhX1Syiw7FmCpXfPYlZFCwbue92wA95Ws+6vT/wCWqP69qrjpZ1R10zcBVk9SMh9kg9p7mrVdGujvTWQGUuxb0azvUBHKV4/kEdr3bYivQRWn8e6WPhF5MkbIwPY4Oa4bgjvCxL2YxuNcxt6/XrOeN2iWQN3+G6yi5sTCXbNa0bk9wC5y1pnHaj1NPYYS6Bh6quPzRy/aVayexGOh0f1U2s4SL5bqnAPcGtzNEuJ2AE7eZW3BBXMefwNjT1+OrY/CfCyUO227fkVePR/qD0/pmF8jt7Nf7zMO/cdh+0Ktdrk9rNdZoI01q2uWYsle61L9U4GN7mPzFFrmnYgzNBBW1PYVyzlG75i6Ntz9If8AxFTbZsKdP0UdVKSbxg6dpZOjko3SUrcNljTwudE8OAPhyWXuueuj3UZ05qRsU5LKloiKYHlwnud9hXQYcCNweSmue9ZM9bpHprNvdex4XMhTx0PXXbMVeLfh45XBo38NysAaqwDnADM0STyH39vzVQdJ+ozms8MbWcXVaZLdh9eTvP2dihEDeG3E0jYiRoI294Wcr8SwjoafpCspVk5Yb9jqwEEAjmCtXJqfBQyuily9Jj2Hhc10zQQfBbGH8RH+iFWGR6IH38lat+mGs6+V0nD9H323O+3atZOSXlRzNPXTKTV0tqJ391en/wAtUf17U+6vT/5aofr2qsrvRHDjqctu3qGKGCIcTnur7Af8yrWdkLJ3tgeZIg4hr3M4S4eO3csZXTj3R06Om6a/Ph2N4+x09Tz2Iv2BBUyVWeYgkMjlDjsPcFslVXRfou1SnbnrwMLnMLYYCNiWn6zvD3BWoAtoNtZZy9VVXVa4Vyykfqxrv0v6M/6F1P0jb1Ou34N/ftzWQSQCQN1AM5iNd6nsPhiylfT+M324YCZbDx4ucNgPgCtIpN8vB52fl/GdIVmyWR6vw9Mu5thhpc9v94klR+9Z1Lpu21mb6Tatc9pacbx8vJYVnQGE0vfbZu1NWZ+808fXVoyGg/pAg/tUhHSmxjBBPozUnVAcJ463Gdvfv2r04f8AbyvwkUNljtd6PyFOOpf1LishMeTnSxCJrv8AddyCx8p0XaO1LAbeOZHTndzZax0gA3+A9U/sWRi5NHavk4JNNdXY24iy9izET/vbbHzW9s4u1iMV1OlKeKqvad+pmiLY3fazbY+/ms3La/LlMtgrypjekrQlgdRL90mHafWhL/vob+bvzB925CshjMdqzAM+l0TJUsM9evai4XNPeCDzBChEnSRqXAWhHqvR80VffY28e4ysHv8Ah9qsHFZajnMbDfx1hs9aUbte39xHcR4JY5cSa/VEIhWndAXNGaoNjCXjLg7W4s0p3etEfquae/bz+K3+tdI1NZYCTH2CI5m+vXnA5xv8fh4hQim/Vmv9SZmFuds4HGY2x1DYazNpXnnzJPmsDWLtddHVKLI1NUyZPHOkEbm3Ymuexx7N/EFX2yc15vMPYmfRdQy+H0o/E5iF0c1K1JFETzDo+RBae8cypwqCxPT/AJKJzGZbD152djn1nljvI7hW1pbW+D1dXMmMtAytG8leQcMjPiO8e8clS6qyMnKSCkmSNE3RYlj5f+A74FcrZD+0rY/95/8AEV1Q78B3wK5Yv/2na/zn/wARXm1Psd7ofqn+hPtSaWdldH4zUtGMunbVYLTG8y4AbcXxG3NOjPWbsfZZhL8n9TmO0D3H8W893wKsbQrQ7QuKaQCDAAQe/mVWHSLop2CuHJ49hGPndu5rR+Jf8iolFxxOIovhfu0l3y8Mh+YgNXN34HD1o7Ejf+YroLQn+g+H/wBnH81zrZszW7L7Fh5fK87uce87bbrorQn+g+H/ANnH7yoo9TZr1mLjRBP+cGTqfT1bUmGloT8nH1opO9j+4rn2OTJ6P1HxAdTdqPIIPYR/MELptUJ0rD/vtJ/kR/zV9RHjcjz9Htbm6JcxaNLgcLe1hqLqeJxdK8y2Jj9Vu/M/HuC6KxuNrYqhDSqRiOGFvC0BVZ0MD+sZX9GP95VuOcGtLidgBuT4KaIrbuMur3Sld4S9MSEdJ2ojhtOGpBJw27u8bdu1rPrHy5KpNHQUJdT1HZKzDXpwnrXuldsDw8wPtOy9tcZ52oNTWJ2O3rQkww+HCD2/aVI9J9GEeewUORuXpq7piSxjGNPq9x5rKTc7PL7HRphXo9H/AFXhy/czelG3g81ja1uhk6c9us/hLI5AXOYfkVG+jfUHoPUzIpX8NW5tFJueQd9U+fL7VMz0L0NuWYtfqmqpsjSmxeUsU5d2y15Czf3g8j+5RNSjJTawW0n091EtNCWfyjqffdq5ayx2zF4jtE7yP+Iq/dCagGf0xDK929mAdVMPzh3/AGhUFlf7Yu/58n8RV73lJo83R63XdZCXdEi1phHV4sdnIW/1bIwMc8j6svCN/PtUrx3SD1PRtKZJQcpB/VWDfm7ceq7y/cpRSwkOoOjSlj5th1lRhY4j8F4HIqj34HJsyRofQpzOJeq2EZ23327duxValB5j7mtMqtXDw7XzB/6N9obBuyd63lrLC+rj43TOJ7HybbgfzUWhcX3Y3ntdKCfNdAVcBFpzQFmhGAXiq90rh9Z5bzK59rf+Ig/Tb+8KJw2pI9Gj1Pjyskuy4X4OqofxMf6I/cvG/kauMpS27krYoIhu5zj2JLaipY11mY7RRRcbyBvsAOaoDWWs7WqrnC3ihx8bvvMO/b+c73/uXonYoI4Gj0U9VY0uy7n1rTWtrVNzq4+KLHRu+9Q783fnO9/uUt6Pujw/eszmofzq9Z47PBzh+4KE6SyOCxF/6bl6lm3JGd4Y42tLAfE7nmrIHTHhQP7Pv+TPmsIOLe6b5OxrI3Qr+n0sGo/JZAAHYv1QvT/SRjdRZePHVqluKV7S4OkDduXwKmYK9cZKSyj522mdUttiwz4llZDC+WRwaxjS5zj2ADmSqZs29X9KOVc3EWJ8PpiJ5aLQJY6cD6w22LvcOQHernkiZNE6ORgex4LXNcNwQe4qO6x1BV0bpOe+6o2WOMNijrt2a1xdyDfcFrXJp8LLMmRKDXmB0mwYLEvy+pb8Z4ZHROdMS7vBeeQ+A7FOsFk8jkqBs5LEPxbjzbDJOJH7eJ2HL4KI9F1/N5qjLlbdHH47Fv3bUrVK/AX+Lie3b962me6SsBgco3El1i7knODBVpx8bg49gJ3AB9ytOOXtS5CPjMdJONxc74IcXmr72nYuq0Xlm/6TgAfsWvodL2LsW2QXcNmse17g0Sz1CWD47din1aV81eOSWF0L3NBMbiCW+47cl+WblWmzjtWIoGf4pZA0eZVE4Yxjn8g9WubIwOaQWuG48CFFtQ6it6ZY76HpW/fgPrF9Lg2B792jn+xSKrkKV4E07dewG9phla/byKxs1ma+EomxNHPK48o4a8Rkkkd4NA//ABVjw+USUzlunPLR8cdHTbaUh7X2+Jzgfe0AKtNQ6vz2qJg/L5CSdrTuyIDhjYfc0ct/erC1zrHW1yJ30mCLTuOk/FxTPaLEo/a7yACqJxJcSXcRJ3J8V19PXFLcopP9zGTJzoOtoCxTtnV1uaG0Hfem8Tms4Nu0Fo5u337VGpMgzDakluact2IooZiaszuT+Du3Hz7Vr69ee1O2CtDJNM/k2ONpc4/YOam2J6INY5VrXux7KUZ+tbkDD/wjcrR7INucu/sxy+xZnR/0tz6hklp5eg2N9au6eW5CfV4W95Z27n3Kf6Z1RQ1XjpL+NbYEDJTFvPEWFxHeN+0KEaE6Im6Wutyd3KTS32nZraryyPh8Hbjd37lZ7GNY3haA0eAGy5N/h7n4fY0WfcEbghRSTo30rLK+R+M3c9xc49c/mT9qli02qM43T+CnvcPWT8o68Q7ZJXcmtH2rHapcGsLZ1+htGfj6FbGUoqdSPq68LeFjNydh8Svu5Tr36slW1E2WCVvC9jhyIUKwFnLad1DWxGevy3G5SASwzyu3DLAH3yIfm94HuU87lMo44K7m3n3Ij/RppP8AJf8A1n/NSXH0K2MoQ0qkfV14W8LG7k7D7VXU2W1BU1zqG5Tmnu0cc6HrsZ27xOZu50fg8bb7d6sLF5SnmMbBfoTtmrTN4mPb+4+B9yOtQ5Red1lnE5N/lmYVH8tovA5u6bmQo9dYLQ0u6xw5Ds7CsDNXrcPSNpqnFZkZWnhsGWIO9V5AG249yl/colHhZKwslB5g8M02F0viNPOldjKnUGUDj9dzt9uztK2divHarSV5QTHI0tcASNwe3mFCNQWMxqPOXMZgMhLUGJg6ySWI7CWyRuyI/mgDmPepNpnOR6hwNbIMb1cjhwTRHtjkbyc0/AqXDaiJTlKW6TyzUf0aaT7PRf8A1n/NSirVhpVoq1dgjhiaGsaO4DuUa6SbtrHaBylulYkr2I2NLJYzs5vrgcipHRe59Cu95Jc6JpJPedgqqCisovO6yzicmzIUdyeh9PZe8+7ex4lsP24niRzd9vcCvrVdLLT0ormEtSRX6b+tZBxbR2R3xvHvHYe4rLwGcragxEV+vuzclksTvwopBycxw7iCpccrLKwsnB5g8M88NpfE6fMxxlUwdcBxjrHOB29xK1svRxpaeaSWTGcT5HFzj1z+ZPb3rxdeu6o1QK2Nsy18NjJP63YidsbMw/1TT/hH1j9i2MulIpJXyemM23icXcLMg8Ae4DuCOEezLq+1SclJ5f3NxTpwUKcVStHwQRNDGN332A+KyNlWmGxti9rrUOJmzmbNWi2AwgX3gguBJ3Pepnj9PR4+0LDcllLBAI4LNx0jOfuKvKKjxkyy28s2divFaryV5m8UUjSxzd9twVF2dGulGPa5uL5tII+/P+awclkbsXTHhccy3M2nLjpZHwB3qOcCdiR48lvdV6kbpvGRysgNm5ZlbXqVgdjLI7sG/cO8lVdeWvuXhdZBeRtG2sVIbVSSpMzihkYWObv2tPLZRn+jTSY/8r/6z/mvqrpjKX4xPqDPXpJ3jc16EprQR/mjh9Z3xJXq/SUtYiTE57K1JQQdppzZjcPAsk3/AGEI4QfcmF1lfok0eP8ARrpP8lD9c/5p/RrpP8lD9c/5rJ1rm7em9I28jVjbLYjDWhzm+qzcgF7h4DfdY9HSsV6nFau5/K5CSVgd10d10UZ372NjIAHmqqqOMtF/qr/83+7MvF6J0/hrzbtCh1NhoID+sceR7eRKkIWgpYC7jchHJVzt6WmN+sq3CJwfDhefWb5lSAKcJcIynOc3mbywtLqrTVXVmBsYm45zI5diHs7WOHYQt0ilNp5RUxKtNmPxsNOs0NZDEI4wBt2DYKluhzT77er85m8nHx2qczom8fMiVxPEfjty+1XosOrjKdG1asVoGxy23iSdzRtxuA23Pv2V42OMZL5IwRPpQ1fY0dpgWKLWm7Zk6mFzhuGcty7bv2CrzQvR1Z1swak1dcs2a8pLoYZJDxSjftJ7m+4K0te6Pj1ppuTHGQQ2GO62vKRuGvA7/cd9ltMfiWV9NV8TI3hayqK7ww9nq7HYq8bVCvEe5DWWfmCx+EoUuqwdelFXYeA/RQ3bcdoJHaR71pekbWP3G6adbiAfdnd1VZruzi2/CPuA5r60BpSxo7FXMXJO2eubTpa8g5HgcBycPELB6R+j+fXUWPZDkGVPornk8cZfxcQHgR4KsNvieZ8EvODmS/kLeUvS3b1iSxZlO75JDuSf5fBTTo86NLms5DbsSOq4qN2zpQPWlI+qz+ZUp/7Pl7/1BX/+s75q5dO4Zmn9P0cVG4OFaIMLw3biPedveV7btXFQ21MoovPJ5af0phdM1BBiqEUHLZ0gG73+9zu0rc7L9Rc5tt5ZoERCoB+HsVb3797UWumy0cXJksXgnlvqTMja62RzPrHnwjly71P8jFanx1iKlMyGy+Mtile3iDHEciR37LB01gYdN4KvjYXGQxguklI5yyHm5595KtFpckEX1ZHqDP4UwRaZsQXYHtnqz/TYT1crTuDyO+3cfipJpTUMepNPV8gG9XMQWWIj2xSt5OaftW77VHcZpqTEaoyeRq2WijkQJJavB+DMORe0+BHaEynHDBqdMjfpI1j8a38CZKnPorJTZ3Fwulw87uPJUYhuYz3zxj+Jvf2rdYrT0mO1Pmsu6w17cj1XDGG7FnA3bme9b4tBBBCly5GCA5K3XyHSNo65UlbNXmrWXxyMO4cC0c1ItWZ9unNPz3WsMtg7RVoR2yyu5NaPt/ctNV0CMfrKrl6Vzq8fB1r20CzcMkkGziw/VB7dvFbW/p2TJ6qx2TtWGup49jnQ1Q3tmPLjJ9w7ApbjlDk0WlY8/p7CtqyaZsT25HuntT/TYQZZXHdx5n7Fh4y/d05rt/07GSY3F55/qNfMyRrLYH5p5cQ/aFZK0uqdPRamwM+Okf1UjtnwTAc4pGndrh8Cinl8ruMGn6Vf7tcx+gz+NqlOO/s2r/ks/hC0eoNO3dQaHlwli7ELk0LGPs9WeEuBBJ4d9+eyQ1NXwQRxNu4UtjaGgmrLvsBt/jUcOOMgkyrXWdW3g89Ukw1v6H90U4pW2hu4a7b8c3wftuN/gpfRj1KLbDftYp9bnxtgryNefDYlxH7F4ak05JnrmEnZYbCMddFpwc0njABGw8O1RBqMuQza4rF1cNjIKFKMRwQt4WjvPiSe8ntJWYv1CN1UkgWmv71NYfoVv4Sp4o/i9OSY/V2azTrLXsyLYg2IN2LOAbcz37qQK82m+CEV3lv79cD/APFzfxFe+vj9D1JpDKz8qNa85kzz2ML27Ncft5Lb3NLzWukLHalFmNsNSo+u6EtPE4uJO4PZ3reZLGVMvQmo34GT1pm8L43DkQp3pNMGUCCBsv1ROtgtR4SMV8VmobdNnKOHKROe+NvcBIwgkfEE+9ekuO1ZkG9VZy9HHwn8J2Pgc6Uj3OkOzfjsqYXyCSSRsmjdHIxr2OGzmuG4I8CFF3aCpVHukwV6/hXE78FOb70T74nbt8gFtMjg5bmPr16+XyFOevsY7EUm7nEDb1wRs/4FYLINaQN4BdwtsDsklglicfiGuI8lMcrsyTWXM5n9ITVXZ2WrksVPO2ubsMZhlhc47NL2bkEb942U4Cij9L5DNXK0+pMhDPBWkE0VGpCY4S8djnlxLnbeHIKV7JLDIR+oiKpIREQBERAEREAREQBERAEREAREQBERAEREAREQBERAE2REAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQHh1zvAJ1zvAKOenbPsofJ3zT07Z9lD5O+aAkfXO8AnXO8Ao56ds+yh8nfNPTtn2UPk75oCR9c7wCdc7wCjnp2z7KHyd809O2fZQ+TvmgJH1zvAJ1zvAKOenbPsofJ3zT07Z9lD5O+aAkfXO8AnXO8Ao56ds+yh8nfNPTtn2UPk75oCR9c7wCdc7wCjnp2z7KHyd809O2fZQ+TvmgJH1zvAJ1zvAKOenbPsofJ3zT07Z9lD5O+aAkfXO8AnXO8Ao56ds+yh8nfNPTtn2UPk75oCR9c7wCdc7wCjnp2z7KHyd809O2fZQ+TvmgJH1zvAJ1zvAKOenbPsofJ3zT07Z9lD5O+aAkfXO8AnXO8Ao56ds+yh8nfNPTtn2UPk75oCR9c7wCdc7wCjnp2z7KHyd809O2fZQ+TvmgJH1zvAJ1zvAKOenbPsofJ3zT07Z9lD5O+aAkfXO8AnXO8Ao56ds+yh8nfNPTtn2UPk75oCR9c7wCdc7wCjnp2z7KHyd809O2fZQ+TvmgJH1zvAJ1zvAKOenbPsofJ3zT07Z9lD5O+aAkfXO8AnXO8Ao56ds+yh8nfNPTtn2UPk75oCR9c7wCdc7wCjnp2z7KHyd809O2fZQ+TvmgJH1zvAJ1zvAKOenbPsofJ3zT07Z9lD5O+aAkfXO8AnXO9yjnp2z7KHyd809O2fZQ+TvmgP/9k='
const NAVY='#1B2A6B',RED='#C0272D',GREEN='#1F7A4A',GOLD='#D4A017',TEAL='#0D5F6E'
const WARD_COLORS=[NAVY,RED,GREEN,GOLD,TEAL]
const FUND_LABELS={contract:'Contract Farming',mfi:'MFI Loan',gmb_scheme:'GMB Scheme',arda:'ARDA Outgrower',cooperative:'Cooperative',govt_subsidy:'Govt Subsidy',agro_credit:'Agro-dealer Credit',informal:'Informal borrowing',none:'None',other:'Other'}

const ROLES = {
  admin:      {label:'Phillemon Nyamgure',sub:'Nyamz Analytics — Full Control',pw:'nyamz2026',color:RED},
  supervisor: {label:'PhD Supervisor',    sub:'View dashboard only',            pw:'super2026',color:TEAL},
  sydney:     {label:'Sydney Mazambara',  sub:'Researcher — Field + View',      pw:'mbire2026',color:GREEN},
  enumerator: {label:'Enumerator',        sub:'Data entry only',                pw:'enum2026', color:GOLD},
}

const S = {
  nav:{background:NAVY,padding:'0 28px',display:'flex',alignItems:'center',justifyContent:'space-between',height:56,position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 20px rgba(27,42,107,0.4)'},
  card:{background:'#fff',border:'1px solid #E2E6F0',borderRadius:14,padding:20},
  metric:(color)=>({background:'#fff',border:'1px solid #E2E6F0',borderRadius:14,padding:'18px 20px',borderTop:`3px solid ${color}`}),
  tab:(a)=>({padding:'14px 18px',fontSize:13,fontWeight:a?600:500,cursor:'pointer',borderBottom:a?`2.5px solid ${NAVY}`:'2.5px solid transparent',color:a?NAVY:'#6B7280',whiteSpace:'nowrap'}),
  btn:(bg,c='#fff')=>({background:bg,color:c,border:'none',borderRadius:9,padding:'10px 18px',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}),
  input:{width:'100%',padding:'9px 12px',border:'1.5px solid #E2E6F0',borderRadius:9,fontSize:13,fontFamily:'inherit',outline:'none',marginBottom:10,background:'#fff'},
  radio:(sel)=>({padding:'6px 13px',borderRadius:20,border:`1.5px solid ${sel?NAVY:'#E2E6F0'}`,fontSize:12,cursor:'pointer',color:sel?NAVY:'#6B7280',fontWeight:sel?600:400,background:sel?'#EEF2FF':'#fff',userSelect:'none',transition:'all 0.15s'}),
  label:{fontSize:12,color:'#374151',fontWeight:600,marginBottom:5,display:'block',marginTop:12},
  labelShona:{fontSize:11,color:'#6B7280',fontStyle:'italic',marginBottom:6,display:'block'},
  secHead:(bg)=>({background:bg,color:'#fff',padding:'12px 16px',borderRadius:10,marginBottom:14,marginTop:24,fontSize:13,fontWeight:700}),
  statRow:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid #F0F2F8',fontSize:12},
}

export default function Home() {
  const [view,setView]=useState('login')
  const [role,setRole]=useState('admin')
  const [pw,setPw]=useState('')
  const [pwErr,setPwErr]=useState(false)
  const [tab,setTab]=useState('dashboard')
  const [responses,setResponses]=useState([])
  const [users,setUsers]=useState([])
  const [form,setForm]=useState({q14_models:[]})
  const [submitStatus,setSubmitStatus]=useState('')
  const [newEnum,setNewEnum]=useState({name:'',email:'',ward:''})
  const [showAddEnum,setShowAddEnum]=useState(false)

  const fetchData = useCallback(async()=>{
    try {
      const [{data:r},{data:u}] = await Promise.all([
        supabase.from('responses').select('*').order('submitted_at',{ascending:false}),
        supabase.from('users').select('*')
      ])
      if(r) setResponses(r)
      if(u) setUsers(u)
    } catch(e){ console.error(e) }
  },[])

  useEffect(()=>{
    if(view!=='main') return
    fetchData()
    const ch = supabase.channel('rt').on('postgres_changes',{event:'*',schema:'public',table:'responses'},fetchData).subscribe()
    const interval = setInterval(fetchData, 30000)
    return ()=>{ supabase.removeChannel(ch); clearInterval(interval) }
  },[view,fetchData])

  function doLogin(){
    if(pw===ROLES[role].pw){setPwErr(false);setView('main')}
    else setPwErr(true)
  }

  const total=responses.length
  const pct=((total/460)*100).toFixed(1)
  const femaleHH=responses.filter(r=>r.q4_hhhead==='female_headed').length
  const useFunding=responses.filter(r=>r.q13_usefunding==='yes').length
  const hwcAffected=responses.filter(r=>r.q19_hwc>=4).length
  const lateDisb=responses.filter(r=>r.q20_latedisbursement>=4).length
  const avgDrought=total?(responses.reduce((s,r)=>s+(r.q18_drought||0),0)/total).toFixed(1):'–'
  const enumerators=users.filter(u=>u.role==='enumerator')

  const wardData=['Ward 1','Ward 2','Ward 3','Ward 4','Ward 5'].map((w,i)=>({ward:w,collected:responses.filter(r=>r.ward===w).length,target:92,color:WARD_COLORS[i]}))
  const genderData=[{name:'Male',value:responses.filter(r=>r.q1_sex==='male').length},{name:'Female',value:responses.filter(r=>r.q1_sex==='female').length}]
  const fundMap={};responses.forEach(r=>{if(r.q14_models)r.q14_models.forEach(m=>{fundMap[m]=(fundMap[m]||0)+1})})
  const fundData=Object.entries(fundMap).sort((a,b)=>b[1]-a[1]).slice(0,7).map(([k,v])=>({name:FUND_LABELS[k]||k,count:v}))
  const dailyMap={};responses.forEach(r=>{const d=r.submitted_at?.slice(0,10);if(d)dailyMap[d]=(dailyMap[d]||0)+1})
  const dailyData=Object.entries(dailyMap).sort(([a],[b])=>a.localeCompare(b)).slice(-14).map(([d,c])=>({day:d.slice(5),count:c}))

  function setF(k,v){setForm(p=>({...p,[k]:v}))}
  function toggleModel(m){setForm(p=>({...p,q14_models:p.q14_models.includes(m)?p.q14_models.filter(x=>x!==m):[...p.q14_models,m]}))}

  async function submitForm(e){
    e.preventDefault()
    if(!form.ward||!form.questionnaire_no){setSubmitStatus('error:Fill in Ward and Questionnaire Number');return}
    const payload={
      questionnaire_no:form.questionnaire_no, ward:form.ward,
      // Section A
      q1_sex:form.q1_sex, q2_age:form.q2_age, q3_education:form.q3_education,
      q4_hhhead:form.q4_hhhead, q5_farmsize:form.q5_farmsize,
      q6_experience:form.q6_experience, q7_hhsize:form.q7_hhsize, q8_marital:form.q8_marital,
      // Section B
      q9_yield:form.q9_yield, q10_pctsold:form.q10_pctsold,
      q11_market:form.q11_market, q12_planting:form.q12_planting,
      // Section C
      q13_usefunding:form.q13_usefunding, q14_models:form.q14_models,
      q15_fundtiming:form.q15_fundtiming, q16_barrier:form.q16_barrier,
      // Section D Likert
      q18_drought:parseInt(form.q18_drought)||null,
      q19_hwc:parseInt(form.q19_hwc)||null,
      q20_latedisbursement:parseInt(form.q20_latedisbursement)||null,
      q21_repayability:parseInt(form.q21_repayability)||null,
      q22_pricefluctuation:parseInt(form.q22_pricefluctuation)||null,
      q23_trust:parseInt(form.q23_trust)||null,
      q24_govtsupport:parseInt(form.q24_govtsupport)||null,
      // Section E
      q25_cooperative:parseInt(form.q25_cooperative)||null,
      q26_extension:parseInt(form.q26_extension)||null,
      q27_community:parseInt(form.q27_community)||null,
      q28_mobile:parseInt(form.q28_mobile)||null,
      q29_digital:parseInt(form.q29_digital)||null,
      // Section F
      q30_landowner:form.q30_landowner,
      q31_femchallenge:parseInt(form.q31_femchallenge)||null,
      q32_cultural:parseInt(form.q32_cultural)||null,
      q33_femproduct:parseInt(form.q33_femproduct)||null,
      q34_femdecision:parseInt(form.q34_femdecision)||null,
      // Section G
      q35_bundled:parseInt(form.q35_bundled)||null,
      q36_riskpool:parseInt(form.q36_riskpool)||null,
      q37_cropinsurance:parseInt(form.q37_cropinsurance)||null,
      q38_digital_trust:parseInt(form.q38_digital_trust)||null,
      q39_history:parseInt(form.q39_history)||null,
      // Section H
      q40_cooperation:form.q40_cooperation,
      q41_dwelling:form.q41_dwelling,
      enumerator_code:form.enumerator_code||null,
    }
    const {error}=await supabase.from('responses').insert([payload])
    if(error){setSubmitStatus('error:'+(error.message.includes('unique')?'Questionnaire number already exists!':error.message))}
    else{setSubmitStatus('success:Response saved! / Mhinduro yasungirirwa!');setForm({q14_models:[]});fetchData()}
    setTimeout(()=>setSubmitStatus(''),5000)
  }

  async function addEnumerator(){
    if(!newEnum.name||!newEnum.email||!newEnum.ward) return
    const code=`ENUM-W${newEnum.ward}-${String(enumerators.filter(e=>e.ward===`Ward ${newEnum.ward}`).length+1).padStart(3,'0')}`
    await supabase.from('users').insert([{name:newEnum.name,email:newEnum.email,role:'enumerator',ward:`Ward ${newEnum.ward}`,enumerator_code:code,is_active:true}])
    setNewEnum({name:'',email:'',ward:''});setShowAddEnum(false);fetchData()
  }

  function exportCSV(){
    if(responses.length===0){alert('No data yet!');return}
    const headers=Object.keys(responses[0])
    const rows=responses.map(r=>headers.map(h=>{const v=r[h];return Array.isArray(v)?v.join('|'):(v??'')}))
    const csv=headers.join(',')+'\n'+rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}))
    a.download=`Mazambara_PhD_${new Date().toISOString().slice(0,10)}.csv`;a.click()
  }

  // ── COMPONENTS ────────────────────────────────
  const Q = ({en,sh})=>(
    <div style={{marginBottom:4}}>
      <div style={S.label}>{en}</div>
      <div style={S.labelShona}>{sh}</div>
    </div>
  )

  const RadioGroup = ({id,opts,multi=false})=>(
    <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14}}>
      {opts.map(([v,en,sh])=>{
        const sel = multi ? (form[id]||[]).includes(v) : form[id]===v
        return <div key={v} style={S.radio(sel)} onClick={()=>{
          if(multi){
            const arr=form[id]||[]
            setF(id,arr.includes(v)?arr.filter(x=>x!==v):[...arr,v])
          } else setF(id,v)
        }}>
          <span>{en}</span>
          {sh&&<span style={{fontSize:10,color:sel?'#4B6BEF':'#9CA3AF',display:'block'}}>{sh}</span>}
        </div>
      })}
    </div>
  )

  const Likert = ({id,en,sh,qn})=>(
    <div style={{marginBottom:16,padding:'12px 14px',background:'#FAFBFF',borderRadius:10,border:'1px solid #E8ECF8'}}>
      <div style={{fontSize:12,fontWeight:600,color:'#1a1d2e',marginBottom:2}}>{qn}. {en}</div>
      <div style={{fontSize:11,color:'#6B7280',fontStyle:'italic',marginBottom:8}}>{sh}</div>
      <div style={{display:'flex',gap:6,alignItems:'center'}}>
        {[1,2,3,4,5].map(n=>(
          <div key={n} onClick={()=>setF(id,n)} style={{width:40,height:40,borderRadius:8,border:`1.5px solid ${form[id]===n?NAVY:'#E2E6F0'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,cursor:'pointer',background:form[id]===n?NAVY:'#fff',color:form[id]===n?'#fff':'#6B7280',fontWeight:form[id]===n?700:400,transition:'all 0.15s'}}>{n}</div>
        ))}
        <span style={{fontSize:10,color:'#9CA3AF',marginLeft:6}}>1=Strongly Disagree · 5=Strongly Agree</span>
      </div>
    </div>
  )

  const SecHead = ({bg,en,sh,vars})=>(
    <div style={{...S.secHead(bg)}}>
      <div>{en}</div>
      <div style={{fontSize:11,opacity:0.8,marginTop:2,fontStyle:'italic'}}>{sh}</div>
      {vars&&<div style={{fontSize:10,opacity:0.7,marginTop:3}}>Variables: {vars}</div>}
    </div>
  )

  // LOGIN
  if(view==='login') return (
    <div style={{minHeight:'100vh',background:`linear-gradient(135deg, #0a1628 0%, #1B2A6B 50%, #0a2018 100%)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#fff',borderRadius:20,padding:'36px 32px',width:420,boxShadow:'0 24px 80px rgba(0,0,0,0.4)'}}>
        <div style={{textAlign:'center',marginBottom:20}}>
          <img src={LOGO_B64} alt="Nyamz Analytics" style={{height:65,marginBottom:10}}/>
          <div style={{fontSize:11,color:'#9CA3AF'}}>Mazambara PhD · Field Data Portal · Mbire District 2026</div>
        </div>
        <div style={{height:3,background:`linear-gradient(90deg,${NAVY},${RED})`,borderRadius:2,marginBottom:24}}></div>
        {Object.entries(ROLES).map(([k,r])=>(
          <div key={k} onClick={()=>setRole(k)} style={{padding:'11px 14px',border:`2px solid ${role===k?NAVY:'#E2E6F0'}`,borderRadius:12,marginBottom:8,cursor:'pointer',background:role===k?'#EEF2FF':'#fff',display:'flex',alignItems:'center',gap:12,transition:'all 0.15s'}}>
            <div style={{width:36,height:36,borderRadius:9,background:r.color+'22',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>
              {k==='admin'?'👑':k==='supervisor'?'🎓':k==='sydney'?'🌾':'📋'}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600,color:'#1a1d2e'}}>{r.label}</div>
              <div style={{fontSize:11,color:'#6B7280'}}>{r.sub}</div>
            </div>
            {role===k&&<div style={{color:NAVY,fontWeight:700}}>✓</div>}
          </div>
        ))}
        <input style={{...S.input,marginTop:12}} type="password" placeholder="Password / Pasiwedi" value={pw} onChange={e=>{setPw(e.target.value);setPwErr(false)}} onKeyDown={e=>e.key==='Enter'&&doLogin()}/>
        {pwErr&&<div style={{color:RED,fontSize:12,textAlign:'center',marginBottom:8}}>❌ Incorrect password. Please try again.</div>}
        <button style={{...S.btn(NAVY),width:'100%',padding:'13px',fontSize:14}} onClick={doLogin}>Sign In / Pinda</button>
        <div style={{fontSize:10,color:'#D1D5DB',textAlign:'center',marginTop:12}}>🔒 Secured by Nyamz Analytics · Export restricted to Admin only</div>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh'}}>
      <div style={S.nav}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <img src={LOGO_B64} alt="NA" style={{height:34}}/>
          <div>
            <div style={{fontSize:14,fontWeight:600,color:'#fff'}}>Mazambara PhD — Live Dashboard</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',marginTop:1}}>
              <span style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:'#4ADE80',marginRight:5,verticalAlign:'middle'}}></span>
              Live · {total} of 460 · Mbire District
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <div style={{background:ROLES[role].color,color:'#fff',padding:'4px 12px',borderRadius:20,fontSize:12,fontWeight:600}}>{ROLES[role].label}</div>
          <button style={{background:'rgba(255,255,255,0.12)',color:'rgba(255,255,255,0.8)',border:'none',borderRadius:20,padding:'4px 12px',fontSize:12,cursor:'pointer'}} onClick={()=>setView('login')}>Sign out</button>
        </div>
      </div>

      <div style={{background:'#fff',borderBottom:'1px solid #E2E6F0',display:'flex',padding:'0 28px',overflowX:'auto'}}>
        {['dashboard','collect','enumerators','export'].map(t=>{
          if(t==='collect'&&role==='supervisor') return null
          if(t==='enumerators'&&role!=='admin') return null
          if(t==='export'&&role!=='admin') return null
          return <div key={t} style={S.tab(tab===t)} onClick={()=>setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</div>
        })}
      </div>

      <div style={{padding:'24px 28px',maxWidth:1300,margin:'0 auto'}}>

        {/* DASHBOARD */}
        {tab==='dashboard'&&<>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
            {[
              {label:'Total Collected',val:total,sub:'of 460 target',color:NAVY},
              {label:'Completion',val:pct+'%',sub:total>=460?'✓ Complete!':'In progress',color:GREEN},
              {label:'Female-Headed HH',val:total?Math.round(femaleHH/total*100)+'%':'–',sub:femaleHH+' households',color:RED},
              {label:'Using Formal Funding',val:total?Math.round(useFunding/total*100)+'%':'–',sub:useFunding+' farmers',color:TEAL},
            ].map((m,i)=>(
              <div key={i} style={S.metric(m.color)}>
                <div style={{fontSize:11,color:'#6B7280',textTransform:'uppercase',letterSpacing:0.7,fontWeight:500,marginBottom:6}}>{m.label}</div>
                <div style={{fontSize:30,fontWeight:700,color:m.color,lineHeight:1}}>{m.val}</div>
                <div style={{fontSize:11,color:'#6B7280',marginTop:5}}>{m.sub}</div>
              </div>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
            <div style={S.card}>
              <div style={{fontSize:13,fontWeight:600,color:NAVY,marginBottom:16}}>Ward Progress <span style={{background:'#EEF2FF',color:NAVY,fontSize:10,padding:'2px 8px',borderRadius:10,fontWeight:600,marginLeft:8}}>Live</span></div>
              {wardData.map(w=>{const p=Math.round(w.collected/w.target*100);return(
                <div key={w.ward} style={{marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4}}>
                    <span style={{color:'#6B7280'}}>{w.ward}</span>
                    <span style={{color:'#9CA3AF',fontFamily:'monospace'}}>{w.collected}/92 ({p}%)</span>
                  </div>
                  <div style={{height:8,background:'#F0F2F8',borderRadius:4,overflow:'hidden'}}>
                    <div style={{height:'100%',width:p+'%',background:w.color,borderRadius:4,transition:'width 0.8s'}}></div>
                  </div>
                </div>
              )})}
            </div>
            <div style={S.card}>
              <div style={{fontSize:13,fontWeight:600,color:NAVY,marginBottom:16}}>Daily Submissions</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dailyData.length?dailyData:[{day:'No data',count:0}]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                  <XAxis dataKey="day" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
                  <Tooltip/><Bar dataKey="count" fill={NAVY} radius={[5,5,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginBottom:16}}>
            <div style={S.card}>
              <div style={{fontSize:13,fontWeight:600,color:NAVY,marginBottom:16}}>Gender Split</div>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={genderData.some(g=>g.value>0)?genderData:[{name:'No data',value:1}]} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                    {genderData.map((_,i)=><Cell key={i} fill={[NAVY,RED][i]}/>)}
                  </Pie><Tooltip/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={S.card}>
              <div style={{fontSize:13,fontWeight:600,color:NAVY,marginBottom:16}}>Funding Models</div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={fundData.length?fundData:[{name:'No data',count:0}]} layout="vertical">
                  <XAxis type="number" tick={{fontSize:9}}/><YAxis type="category" dataKey="name" tick={{fontSize:9}} width={80}/>
                  <Tooltip/><Bar dataKey="count" fill={GREEN} radius={[0,4,4,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={S.card}>
              <div style={{fontSize:13,fontWeight:600,color:NAVY,marginBottom:16}}>Key Indicators</div>
              {[
                ['Female-headed HH',total?Math.round(femaleHH/total*100)+'%':'–'],
                ['Using formal funding',total?Math.round(useFunding/total*100)+'%':'–'],
                ['HWC impact (≥4/5)',total?Math.round(hwcAffected/total*100)+'%':'–'],
                ['Late disbursement (≥4)',total?Math.round(lateDisb/total*100)+'%':'–'],
                ['Avg drought risk',avgDrought+'/5'],
                ['Active enumerators',enumerators.filter(e=>e.is_active).length],
              ].map(([k,v],i)=>(
                <div key={i} style={S.statRow}><span style={{color:'#6B7280'}}>{k}</span><span style={{fontWeight:700,fontFamily:'monospace'}}>{v}</span></div>
              ))}
            </div>
          </div>
          <div style={S.card}>
            <div style={{fontSize:13,fontWeight:600,color:NAVY,marginBottom:16}}>Recent Submissions <span style={{background:'#DCFCE7',color:'#166534',fontSize:10,padding:'2px 8px',borderRadius:10,fontWeight:600,marginLeft:8}}>Auto-refresh 30s</span></div>
            {responses.length===0
              ?<div style={{textAlign:'center',color:'#9CA3AF',padding:30,fontSize:13}}>No responses yet. Share the Collect Data link with enumerators!</div>
              :responses.slice(0,6).map(r=>(
                <div key={r.id} style={{display:'flex',gap:10,padding:'10px 12px',background:'#F9FAFB',borderRadius:10,marginBottom:8}}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:r.q1_sex==='female'?RED:NAVY,marginTop:5,flexShrink:0}}></div>
                  <div>
                    <div style={{fontSize:12,fontWeight:600}}>{r.questionnaire_no} — {r.ward} · {r.q1_sex||'?'} · {(r.q4_hhhead||'').replace(/_/g,' ')}</div>
                    <div style={{fontSize:11,color:'#6B7280',marginTop:2}}>Funding: {r.q13_usefunding==='yes'?'Yes':'No'} · Drought: {r.q18_drought||'–'}/5 · HWC: {r.q19_hwc||'–'}/5 · Planting: {r.q12_planting||'–'}</div>
                    <div style={{fontSize:10,color:'#9CA3AF',marginTop:3,fontFamily:'monospace'}}>{new Date(r.submitted_at).toLocaleString()}</div>
                  </div>
                </div>
              ))}
          </div>
        </>}

        {/* COLLECT - FULL 41 QUESTIONS */}
        {tab==='collect'&&role!=='supervisor'&&(
          <div style={{maxWidth:720}}>
            <div style={{background:'#DCFCE7',border:'1px solid #BBF7D0',borderRadius:10,padding:'10px 14px',marginBottom:20,fontSize:12,color:'#166534'}}>
              ✅ All 41 questions from the bilingual questionnaire. Responses save directly to the live database in real time.
            </div>
            {submitStatus&&(
              <div style={{padding:'12px 16px',borderRadius:10,marginBottom:16,background:submitStatus.startsWith('error:')?'#FEE2E2':'#DCFCE7',color:submitStatus.startsWith('error:')?RED:'#166534',fontSize:13,fontWeight:600}}>
                {submitStatus.replace(/^(error|success):/,'')}
              </div>
            )}
            <form onSubmit={submitForm}>

              {/* ── HEADER INFO ── */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:16,padding:'14px',background:'#F8F9FF',borderRadius:10,border:'1px solid #E2E6F0'}}>
                <div>
                  <label style={{...S.label,marginTop:0}}>Ward / Divi *</label>
                  <select style={{...S.input,margin:0}} value={form.ward||''} onChange={e=>setF('ward',e.target.value)} required>
                    <option value="">Select...</option>
                    {['Ward 1','Ward 2','Ward 3','Ward 4','Ward 5'].map(w=><option key={w}>{w}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{...S.label,marginTop:0}}>Questionnaire No *</label>
                  <input style={{...S.input,margin:0}} placeholder="e.g. W1-023" value={form.questionnaire_no||''} onChange={e=>setF('questionnaire_no',e.target.value)} required/>
                </div>
                <div>
                  <label style={{...S.label,marginTop:0}}>Date / Zuva</label>
                  <input type="date" style={{...S.input,margin:0}} value={form.date||''} onChange={e=>setF('date',e.target.value)}/>
                </div>
              </div>

              {/* SECTION A */}
              <SecHead bg={NAVY} en="SECTION A: FARMER PROFILE & DEMOGRAPHICS" sh="CHIKAMU A: CHIMIRO CHEMURIMWA & RUZIVO RWAKE" vars="Descriptive Stats, Probit Model, Cluster Analysis, SEM"/>

              <Q en="Q1. Sex of respondent" sh="Q1. Murume kana Mukadzi"/>
              <RadioGroup id="q1_sex" opts={[['male','Male','Murume'],['female','Female','Mukadzi']]}/>

              <Q en="Q2. Age of respondent" sh="Q2. Makore enyu"/>
              <RadioGroup id="q2_age" opts={[['below_25','Below 25','Pasi pa25'],['25_34','25–34',''],['35_44','35–44',''],['45_54','45–54',''],['55plus','55+ years','']]}/>

              <Q en="Q3. Highest level of education" sh="Q3. Danhiko rekuchikoro rakakwirira"/>
              <RadioGroup id="q3_education" opts={[['none','No formal','Hapana'],['primary','Primary','Chikoro'],['secondary','Secondary','Sekondari'],['tertiary','Tertiary','Koleji']]}/>

              <Q en="Q4. Household headship" sh="Q4. Mutungamiriri wemhuri"/>
              <RadioGroup id="q4_hhhead" opts={[['male_headed','Male-headed','Murume'],['female_headed','Female-headed','Mukadzi'],['youth_headed','Youth-headed','Mudiki']]}/>

              <Q en="Q5. Farm size (hectares)" sh="Q5. Hukuru hwemunda (mahekitia)"/>
              <RadioGroup id="q5_farmsize" opts={[['lt1','< 1 ha',''],['1_2','1–2 ha',''],['2_5','2–5 ha',''],['5_10','5–10 ha',''],['gt10','> 10 ha','']]}/>

              <Q en="Q6. Years of sorghum farming experience" sh="Q6. Makore ekurima sorghum"/>
              <RadioGroup id="q6_experience" opts={[['lt2','< 2 years',''],['2_5','2–5 years',''],['6_10','6–10 years',''],['11_20','11–20 years',''],['gt20','> 20 years','']]}/>

              <Q en="Q7. Ward of residence" sh="Q7. Divi raMunogara"/>
              <RadioGroup id="q7_ward_res" opts={[['ward1','Ward 1',''],['ward2','Ward 2',''],['ward3','Ward 3',''],['ward4','Ward 4',''],['ward5','Ward 5','']]}/>

              <Q en="Q8. Household size" sh="Q8. Huwandu hwemhuri"/>
              <RadioGroup id="q7_hhsize" opts={[['1_3','1–3',''],['4_6','4–6',''],['7_9','7–9',''],['10_12','10–12',''],['13plus','13+','']]}/>

              {/* SECTION B */}
              <SecHead bg={RED} en="SECTION B: SORGHUM PRODUCTION & PERFORMANCE" sh="CHIKAMU B: KURIMA SORGHUM UNEHUNYANZVI" vars="Descriptive Stats, SEM (dependent variable)"/>

              <Q en="Q9. Average sorghum yield last season (50kg bags)" sh="Q9. Kubuda kwesorghum mugore rapfuura (masaga/50kg)"/>
              <RadioGroup id="q9_yield" opts={[['lt5','< 5 bags',''],['5_10','5–10 bags',''],['11_20','11–20 bags',''],['21_50','21–50 bags',''],['gt50','> 50 bags','']]}/>

              <Q en="Q10. Percentage of sorghum sold (vs kept for household)" sh="Q10. Mazana esorghum inotengwa (pane kuchengetwa kumhuri)"/>
              <RadioGroup id="q10_pctsold" opts={[['0_20','0–20%',''],['21_40','21–40%',''],['41_60','41–60%',''],['61_80','61–80%',''],['81_100','81–100%','']]}/>

              <Q en="Q11. Primary sorghum market / where do you sell?" sh="Q11. Ndepi panonyanya kutengesa sorghum yenyu?"/>
              <RadioGroup id="q11_market" opts={[['gmb','GMB',''],['agro_dealer','Agro-dealer','Mutengesi'],['contract','Contract','Chibvumirano'],['local_market','Local market','Musika'],['cooperative','Cooperative','']]}/>

              <Q en="Q12. Planting timing relative to ideal window" sh="Q12. Mavhiki mangani musati/mushure mekurimira kwenguva yakanaka"/>
              <RadioGroup id="q12_planting" opts={[['early_4plus','> 4 weeks early',''],['early_1_4','1–4 weeks early',''],['on_time','On time','Nenguva'],['late_1_4','1–4 weeks late',''],['late_4plus','> 4 weeks late','']]}/>

              {/* SECTION C */}
              <SecHead bg={GREEN} en="SECTION C: FUNDING MODEL ACCESS & USAGE" sh="CHIKAMU C: KUFIKIWA NEKUSHANDISWA KWEMAMIRIRO EKUFONDERA" vars="Probit Model, Multinomial Logit, SEM, Profile Analysis"/>

              <Q en="Q13. Do you currently use any formal funding model?" sh="Q13. Munoshandisa mamiriro ekufondera ekushandiswa iye zvino?"/>
              <RadioGroup id="q13_usefunding" opts={[['yes','Yes','Hongu'],['no','No','Kwete']]}/>

              <Q en="Q14. Which funding models have you used in the past 3 years? (Select ALL that apply)" sh="Q14. Mamiriro api ekufondera amakashandisa mumakore matatu? (Tinya zvose)"/>
              <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14}}>
                {[['contract','Contract Farming','Kurima Pachishandiso'],['mfi','MFI Loan','Chikwereti cheMFI'],['gmb_scheme','GMB Input Scheme','Hurongwa hweGMB'],['arda','ARDA Outgrower','Hurongwa hweARDA'],['cooperative','Cooperative Savings','Chengetero yeSangano'],['govt_subsidy','Govt Subsidy','Mari yehurumende'],['agro_credit','Agro-dealer Credit','Chikwereti chemutengesi'],['informal','Informal borrowing','Kukwereta kwemuno'],['none','None','Hapana']].map(([v,en,sh])=>{
                  const sel=(form.q14_models||[]).includes(v)
                  return <div key={v} style={S.radio(sel)} onClick={()=>toggleModel(v)}><span>{en}</span><span style={{fontSize:10,color:sel?'#4B6BEF':'#9CA3AF',display:'block'}}>{sh}</span></div>
                })}
              </div>

              {form.q13_usefunding==='yes'&&<>
                <Q en="Q15. When did your funding arrive relative to planting season?" sh="Q15. Kufondera kwenyu kwasvika rinhi pane nguva yekurimira?"/>
                <RadioGroup id="q15_fundtiming" opts={[['very_early','> 4 weeks before','Masvondo 4+'],['early','1–4 weeks before',''],['on_time','Just in time','Nenguva'],['late_1_4','1–4 weeks late',''],['very_late','> 4 weeks late','']]}/>
              </>}

              {form.q13_usefunding==='no'&&<>
                <Q en="Q16. Main reason for NOT using formal funding?" sh="Q16. Chikonzero chikuru chekusashandisa kufondera?"/>
                <RadioGroup id="q16_barrier" opts={[['no_collateral','No collateral','Hapana chekuchengeta'],['too_far','Too far','Kure'],['high_interest','High interest rates','Mubhadharo murefu'],['not_aware','Not aware','Handizivi'],['prev_default','Previous default','Ndakambokutadza'],['cultural','Cultural barriers','Zviradziko'],['no_trust','No trust','Hapana kutenda']]}/>
              </>}

              {/* SECTION D */}
              <SecHead bg={TEAL} en="SECTION D: RISK PERCEPTION (Likert Scale 1–5)" sh="CHIKAMU D: MAONERO PAMUSORO PEZVINETSO" vars="SEM Latent Constructs, SmartPLS, Factor Analysis, Cronbach Alpha"/>

              <Likert id="q18_drought" qn="Q17" en="Drought is the biggest risk to my sorghum farming." sh="Njodzi yezuva rakachena ndiyo njodzi huru yekundirima sorghum kwangu."/>
              <Likert id="q19_hwc" qn="Q18" en="Human-wildlife conflict significantly reduces my sorghum yield." sh="Nharo dzakaitwa nevanhu nemhuka zvinopunza zvakanyanya kubuda kwesorghum yangu."/>
              <Likert id="q20_latedisbursement" qn="Q19" en="Late disbursement of funds causes me to miss the planting window." sh="Kunonoka kwemari kunoita ndisifire nguva yakanaka yekurimira."/>
              <Likert id="q21_repayability" qn="Q20" en="I am unable to repay loans when my crop fails." sh="Ndinokutadza kudzorora chikwereti chirimwa changu chikafa."/>
              <Likert id="q22_pricefluctuation" qn="Q21" en="Price fluctuations of sorghum make it risky to use funding models." sh="Kushanduka kwemutengo wesorghum kunoita kuve njodzi kushandisa mamiriro ekufondera."/>
              <Likert id="q23_trust" qn="Q22" en="I trust the funding institutions operating in Mbire District." sh="Ndinovimba nemanyanga ekufondera ashanda muDunhu reMbire."/>
              <Likert id="q24_govtsupport" qn="Q23" en="Government support programs adequately protect farmers from financial risk." sh="Hurongwa hwehurumende hunochengeta zvakanaka varimi kubva kuzvinetso zvemari."/>

              {/* SECTION E */}
              <SecHead bg={GOLD} en="SECTION E: SOCIAL CAPITAL & INFORMATION ACCESS" sh="CHIKAMU E: PFUMA YEMUMUSHA & KUFIKIWA KWERUZIVO" vars="SEM Latent Constructs, Probit Model, SmartPLS Path Analysis"/>

              <Likert id="q25_cooperative" qn="Q24" en="I am a member of a farmer cooperative or savings group." sh="Ndiri nhengo yesangano revarimi kana boka rechengetero."/>
              <Likert id="q26_extension" qn="Q25" en="I receive regular agricultural extension advice from government officers." sh="Ndinogamuchira mazano ekurima achienderera kubva kuvashandi vehurumende."/>
              <Likert id="q27_community" qn="Q26" en="My neighbours and community share knowledge about funding opportunities." sh="Vavakidzani vangu nemumusha vanogovana ruzivo pamusoro pezvidziviriro zvekufondera."/>
              <Likert id="q28_mobile" qn="Q27" en="I have access to a mobile phone for farming-related information." sh="Ndine foni yepamaoko yekuwana ruzivo rwekurima."/>
              <Likert id="q29_digital" qn="Q28" en="I have heard of or accessed credit through WhatsApp or digital platforms." sh="Ndakunzwa kana kuwana chikwereti kuburikidza neWhatsApp kana nzvimbo dzedijitari."/>

              {/* SECTION F */}
              <SecHead bg="#7C3AED" en="SECTION F: GENDER & VULNERABILITY INDICATORS" sh="CHIKAMU F: BATO REMURUME/MUKADZI & ZVIRATIDZO ZEKUSHAYIWA SIMBA" vars="Gender Disaggregation, Female Targeting Module, SEM Subgroup"/>

              <Q en="Q29. Do you own the land you farm on?" sh="Q29. Munave nenyika yamunorima?"/>
              <RadioGroup id="q30_landowner" opts={[['yes_full','Yes, fully','Hongu, zvizere'],['yes_joint','Yes, jointly','Hongu, pamwe'],['rented','No, rented','Kwete, kukodesha'],['communal','No, communal','Kwete, yemuno']]}/>

              <Likert id="q31_femchallenge" qn="Q30" en="As a woman, I face greater challenges accessing funding than male farmers." sh="Semukadzi, ndinosangana nematambudziko makuru pakuwana kufondera kupfuura varimi varume."/>
              <Likert id="q32_cultural" qn="Q31" en="Cultural norms in my community prevent women from applying for loans." sh="Tsika dzamumusha dzangu dzinodzvanya vakadzi kubva kushambadzira zvikwereti."/>
              <Likert id="q33_femproduct" qn="Q32" en="I would use a funding model designed specifically for women farmers." sh="Ndaishandisa mamiriro ekufondera akagadzirwa kunyanya kuvarimi vakadzi."/>
              <Likert id="q34_femdecision" qn="Q33" en="Female farmers in my area have less decision-making power over farm finances." sh="Varimi vakadzi munzvimbo yangu vane simba diki rekusarudza pamusoro pemari yemunda."/>

              {/* SECTION G */}
              <SecHead bg="#0891B2" en="SECTION G: FRAMEWORK & STRATEGY PREFERENCES" sh="CHIKAMU G: ZVAKAFARIRWA PAMUSORO PECHIMIRO & NZIRA" vars="Framework Development (Obj 4), Candidate Portfolio, Model Prediction"/>

              <Likert id="q35_bundled" qn="Q34" en="A combined funding package (input subsidy + crop insurance + loan) would reduce my farming risk." sh="Pfungswa yakasanganiswa yefondera yaizopunza njodzi yangu yekurima."/>
              <Likert id="q36_riskpool" qn="Q35" en="I would participate in a community-based risk pooling scheme for sorghum farmers." sh="Ndingatore chikamu mushambadziro yekupamharara njodzi yemuno yevarimi vesorghum."/>
              <Likert id="q37_cropinsurance" qn="Q36" en="Crop insurance linked to my funding model would encourage me to take more funding." sh="Inishuransi yechirimwa yakabatana nefondera yaindiitisa kuwana kufondera kuzhinji."/>
              <Likert id="q38_digital_trust" qn="Q37" en="I trust a digital mobile platform to manage my farm funding profile." sh="Ndinovimba nenzvimbo yedijitari yefoni kukurudzira chimiro changu chefondera yemunda."/>
              <Likert id="q39_history" qn="Q38" en="I want my funding history and repayment record used to predict my future funding eligibility." sh="Ndinoda nhoroondo yangu yefondera uye rekodhi rekudzorora kushandiswa kuporofira kufanira kwangu."/>

              {/* SECTION H - ENUMERATOR */}
              <SecHead bg="#374151" en="SECTION H: ENUMERATOR OBSERVATIONS" sh="CHIKAMU H: ZVAKACHERECHEDZWA NEMUVERENGERI" vars="Data quality control — completed by enumerator only"/>

              <Q en="Q39. Was the respondent cooperative and engaged throughout?" sh="Q39. Mubvunzwi akabatikana uye akashirikira munzira yese?"/>
              <RadioGroup id="q40_cooperation" opts={[['yes','Yes','Hongu'],['partial','Partially','Zvimwe'],['no','No','Kwete']]}/>

              <Q en="Q40. Observed dwelling condition" sh="Q40. Mamiriro aakaona ekugara"/>
              <RadioGroup id="q41_dwelling" opts={[['good','Good','Akanaka'],['average','Average','Pakati'],['poor','Poor','Akaipa']]}/>

              <div style={{marginTop:12}}>
                <label style={{...S.label,marginTop:0}}>Q41. Enumerator code / Kodhi yemuverengeri</label>
                <input style={S.input} placeholder="e.g. ENUM-W1-001" value={form.enumerator_code||''} onChange={e=>setF('enumerator_code',e.target.value)}/>
              </div>

              <button type="submit" style={{...S.btn(NAVY),width:'100%',padding:14,fontSize:15,marginTop:8,borderRadius:12}}>
                ✅ Submit Response / Tumira Mhinduro
              </button>
            </form>
          </div>
        )}

        {/* ENUMERATORS */}
        {tab==='enumerators'&&role==='admin'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div style={{fontSize:14,fontWeight:700,color:NAVY}}>Enumerator Management</div>
              <button style={S.btn(GREEN)} onClick={()=>setShowAddEnum(!showAddEnum)}>+ Add Enumerator</button>
            </div>
            {showAddEnum&&(
              <div style={{...S.card,border:`2px solid ${GREEN}`,marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:700,color:GREEN,marginBottom:12}}>New Enumerator</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
                  <input style={{...S.input,margin:0}} placeholder="Full name" value={newEnum.name} onChange={e=>setNewEnum(p=>({...p,name:e.target.value}))}/>
                  <input style={{...S.input,margin:0}} placeholder="Email" value={newEnum.email} onChange={e=>setNewEnum(p=>({...p,email:e.target.value}))}/>
                  <select style={{...S.input,margin:0}} value={newEnum.ward} onChange={e=>setNewEnum(p=>({...p,ward:e.target.value}))}>
                    <option value="">Ward...</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>Ward {n}</option>)}
                  </select>
                </div>
                <div style={{display:'flex',gap:8,marginTop:10}}>
                  <button style={S.btn(GREEN)} onClick={addEnumerator}>Save</button>
                  <button style={S.btn('#E5E7EB','#374151')} onClick={()=>setShowAddEnum(false)}>Cancel</button>
                </div>
              </div>
            )}
            {enumerators.map(e=>{
              const done=responses.filter(r=>r.enumerator_code===e.enumerator_code).length
              const initials=e.name.split(' ').map(n=>n[0]).join('').slice(0,2)
              return <div key={e.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 14px',background:'#F9FAFB',borderRadius:12,marginBottom:8}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:38,height:38,borderRadius:'50%',background:NAVY,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700}}>{initials}</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:700}}>{e.name}</div>
                    <div style={{fontSize:11,color:'#6B7280',fontFamily:'monospace'}}>{e.enumerator_code} · {e.ward} · {done} surveys submitted</div>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:100}}>
                    <div style={{height:6,background:'#E5E7EB',borderRadius:3,overflow:'hidden'}}>
                      <div style={{height:'100%',width:Math.min(100,Math.round(done/92*100))+'%',background:GREEN,borderRadius:3}}></div>
                    </div>
                    <div style={{fontSize:10,color:'#9CA3AF',textAlign:'right',marginTop:2}}>{Math.round(done/92*100)}%</div>
                  </div>
                  <span style={{background:'#DCFCE7',color:'#166534',fontSize:10,padding:'2px 8px',borderRadius:10,fontWeight:600}}>Active</span>
                </div>
              </div>
            })}
            {enumerators.length===0&&<div style={{textAlign:'center',color:'#9CA3AF',padding:40,fontSize:13}}>No enumerators yet.</div>}
          </div>
        )}

        {/* EXPORT - ADMIN ONLY */}
        {tab==='export'&&role==='admin'&&(
          <div>
            <div style={{background:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:10,padding:'10px 14px',marginBottom:16,fontSize:12,color:'#92400E',fontWeight:600}}>
              🔒 Export is restricted to Admin only (Phillemon Nyamgure). All {total} responses with all 41 variables.
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div style={S.card}>
                <div style={{fontSize:13,fontWeight:600,color:NAVY,marginBottom:16}}>Download Data</div>
                {[[GREEN,'📊 Export for SPSS / Stata (CSV)'],[NAVY,'📈 Export for SmartPLS (CSV)'],[TEAL,'📋 Export All 41 Variables (CSV)']].map(([bg,label],i)=>(
                  <button key={i} style={{...S.btn(bg),width:'100%',padding:'11px',marginBottom:8,textAlign:'left'}} onClick={exportCSV}>{label}</button>
                ))}
                <div style={{fontSize:11,color:'#9CA3AF',marginTop:8}}>All exports include complete response data ready for SPSS, Stata, SmartPLS and R analysis.</div>
              </div>
              <div style={S.card}>
                <div style={{fontSize:13,fontWeight:600,color:NAVY,marginBottom:16}}>Data Quality Summary</div>
                {[
                  ['Total responses',total],
                  ['Complete responses',responses.filter(r=>r.is_complete).length],
                  ['Flagged',responses.filter(r=>r.is_flagged).length],
                  ['Wards covered',[...new Set(responses.map(r=>r.ward))].filter(Boolean).length+' / 5'],
                  ['Enumerators active',enumerators.length],
                  ['Ready for analysis',total>=30?'✓ Yes':'Collect more data'],
                ].map(([k,v],i)=>(
                  <div key={i} style={S.statRow}><span style={{color:'#6B7280'}}>{k}</span><span style={{fontWeight:700}}>{v}</span></div>
                ))}
              </div>
            </div>
            <div style={{...S.card,marginTop:16}}>
              <div style={{fontSize:13,fontWeight:600,color:NAVY,marginBottom:16}}>Response Preview (latest 20)</div>
              <div style={{overflowX:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
                  <thead><tr style={{borderBottom:'1px solid #E2E6F0'}}>
                    {['Q.No','Ward','Sex','Education','HH Head','Farm Size','Funding','Yield','Drought','HWC','Late Disb.','Submitted'].map(h=>(
                      <th key={h} style={{textAlign:'left',padding:'8px 10px',fontSize:10,fontWeight:600,color:'#6B7280',textTransform:'uppercase',letterSpacing:0.5,whiteSpace:'nowrap'}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {responses.slice(0,20).map(r=>(
                      <tr key={r.id} style={{borderBottom:'1px solid #F9FAFB'}}>
                        <td style={{padding:'8px 10px',fontFamily:'monospace',fontSize:11}}>{r.questionnaire_no}</td>
                        <td style={{padding:'8px 10px'}}>{r.ward}</td>
                        <td style={{padding:'8px 10px'}}>{r.q1_sex||'–'}</td>
                        <td style={{padding:'8px 10px'}}>{r.q3_education||'–'}</td>
                        <td style={{padding:'8px 10px',fontSize:11}}>{(r.q4_hhhead||'–').replace(/_/g,' ')}</td>
                        <td style={{padding:'8px 10px'}}>{r.q5_farmsize||'–'}</td>
                        <td style={{padding:'8px 10px'}}>{r.q13_usefunding||'–'}</td>
                        <td style={{padding:'8px 10px'}}>{r.q9_yield||'–'}</td>
                        <td style={{padding:'8px 10px',textAlign:'center'}}>{r.q18_drought||'–'}</td>
                        <td style={{padding:'8px 10px',textAlign:'center'}}>{r.q19_hwc||'–'}</td>
                        <td style={{padding:'8px 10px',textAlign:'center'}}>{r.q20_latedisbursement||'–'}</td>
                        <td style={{padding:'8px 10px',fontSize:10,fontFamily:'monospace',whiteSpace:'nowrap'}}>{r.submitted_at?new Date(r.submitted_at).toLocaleDateString():'–'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
