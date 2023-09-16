import React,{useState}from "react";
import NgoLogIn from "./NgoLogin";
import {Link} from "react-router-dom";
function Header({User,ngoName}) {
  const [showPopUp,setShowPopUp]=useState(false);
  function handleLoginPopUp(){
    setShowPopUp((prevValue)=> !prevValue)
  }
  
  return (
    <div className="">
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          <svg
            width="23rem"
            height="6rem"
            viewBox="0 0 230 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector_2"
              d="M148.127 11.8729C147.304 12.0591 146.311 12.5013 145.996 12.8388C145.523 13.3392 145.148 14.3867 145.039 15.5272C144.906 17.0517 144.906 46.2745 145.051 48.8465C145.475 56.5973 147.292 58.9365 153.492 59.7163C156.689 60.1236 159.68 60.0538 160.867 59.5533C161.775 59.1576 162.247 58.2499 162.489 56.3995C162.828 53.6878 162.392 51.0111 161.496 50.2896C160.806 49.731 160.431 49.6146 158.881 49.5215C157.197 49.4167 156.895 49.3004 156.58 48.6254C156.386 48.2297 156.374 46.7517 156.313 31.5526C156.253 18.2737 156.216 14.8173 156.083 14.4448C155.623 13.1065 154.896 12.3849 153.589 11.9776C152.741 11.7216 149.156 11.6518 148.127 11.8729Z"
              fill="#162A51"
            />
            <path
              id="Vector_3"
              d="M131.537 12.1055C130.059 12.4314 129.32 13.0133 128.812 14.2353L128.521 14.9103L128.485 22.6378L128.449 30.3771L127.758 29.7253C125.893 27.968 123.52 27.1999 120.408 27.3396C118.155 27.4443 116.315 27.9913 114.28 29.1784C112.9 29.9697 112.125 30.5633 110.792 31.8551C108.225 34.3223 106.518 37.3365 105.888 40.5602C105.149 44.3193 105.852 48.474 107.765 51.6977C109.412 54.4675 112.367 57.2024 115.14 58.5524C117.283 59.5882 119.1 59.949 121.643 59.8559C124.283 59.7628 126.245 59.0645 127.819 57.6447C128.315 57.1908 128.594 57.0162 128.63 57.1093C128.667 57.2024 128.739 57.4585 128.824 57.6912C128.897 57.924 129.151 58.3313 129.381 58.599C130.483 59.8326 132.808 60.2748 135.908 59.8326C137.604 59.5882 138.548 59.1227 139.081 58.2731C139.287 57.9356 139.529 57.4119 139.614 57.1093C139.82 56.3994 139.917 18.0642 139.735 16.0275C139.517 13.7698 138.827 12.6991 137.252 12.2219C136.393 11.9543 132.566 11.8844 131.537 12.1055ZM124.949 38.6632C125.966 39.1288 126.414 39.5012 127.141 40.502C127.976 41.6309 128.267 42.5852 128.194 43.9818C128.158 44.8779 128.085 45.1805 127.77 45.8206C127.25 46.8912 126.014 48.1365 124.973 48.6253C124.198 48.9977 124.113 49.0093 122.709 49.0093C121.28 49.0093 121.231 48.9977 120.323 48.5787C119.112 48.0201 118.095 47.0542 117.477 45.8555C116.448 43.8537 116.932 41.4563 118.712 39.7223C119.306 39.1404 119.911 38.7563 120.723 38.477C121.267 38.2792 121.619 38.2443 122.769 38.2676C124.041 38.3025 124.234 38.3374 124.949 38.6632Z"
              fill="#162A51"
            />
            <path
              id="Vector_4"
              d="M181.732 11.9193C180.46 12.5478 179.685 14.1189 179.685 16.0042C179.685 17.2029 179.903 17.9943 180.448 18.7624C181.417 20.159 182.991 20.2172 184.214 18.9253C185.898 17.1331 185.922 13.665 184.263 12.2219C183.415 11.4887 182.749 11.4073 181.732 11.9193Z"
              fill="#162A51"
            />
            <path
              id="Vector_5"
              d="M173.945 12.5713C171.317 13.5023 171.753 18.7626 174.599 20.2523C175.423 20.6829 176.404 20.648 177.057 20.1708C177.663 19.7286 178.135 18.751 178.208 17.7618C178.426 14.7126 176.064 11.8264 173.945 12.5713Z"
              fill="#162A51"
            />
            <path
              id="Vector_6"
              d="M187.92 17.0516C187.072 17.296 186.019 18.1922 185.559 19.0417C184.372 21.2529 184.614 23.6852 186.128 24.7792C186.963 25.3844 188.32 25.0469 189.373 23.9762C191.081 22.2421 191.42 19.0766 190.063 17.6568C189.531 17.0982 188.634 16.8422 187.92 17.0516Z"
              fill="#162A51"
            />
            <path
              id="Vector_7"
              d="M168.932 19.007C167.624 19.6238 167.321 21.5674 168.229 23.4178C169.065 25.1169 170.736 26.3738 172.141 26.3738C174.321 26.3738 175.096 24.151 173.812 21.6255C172.734 19.5424 170.421 18.2971 168.932 19.007Z"
              fill="#162A51"
            />
            <path
              id="Vector_8"
              d="M180.412 25.8035C177.154 26.1643 174.078 27.2816 171.535 29.0156C170.191 29.935 168.266 31.8087 167.418 33.019C166.207 34.7647 165.42 36.6268 164.899 38.9427C164.657 40.0018 164.621 40.5022 164.621 42.7832C164.621 45.0643 164.645 45.5531 164.887 46.5888C165.723 50.2897 167.793 53.816 170.421 56.0388C172.444 57.738 175.12 58.9599 178.111 59.5418C183.258 60.5427 191.371 59.8211 194.338 58.0871C195.149 57.6099 196.094 56.6789 196.348 56.097C196.663 55.3638 196.784 54.4793 196.651 53.7811C196.373 52.3612 195.38 50.5341 194.423 49.6845C193.272 48.6604 192.122 48.5906 189.918 49.4052C188.065 50.0802 186.552 50.3595 184.287 50.4293C181.998 50.4992 181.102 50.3479 179.516 49.6031C177.796 48.8 176.973 47.9621 176.718 46.775L176.646 46.4026L184.917 46.3677C193.151 46.3212 193.188 46.3212 193.914 46.0651C196.106 45.2738 197.62 43.563 198.153 41.2703C198.431 40.0483 198.407 37.5927 198.104 36.2078C197.475 33.3333 195.743 30.6216 193.369 28.7829C190.269 26.3738 185.389 25.2566 180.412 25.8035ZM184.723 35.7423C186.285 36.1613 187.29 37.4531 187.169 38.9078C187.109 39.6177 186.83 40.0483 186.212 40.3975C185.825 40.6186 185.546 40.6302 181.163 40.6651L176.512 40.7001L176.597 40.1996C176.73 39.3966 177.251 38.4889 178.014 37.7557C178.813 36.9876 180.061 36.1729 180.908 35.8703C181.998 35.4746 183.5 35.4281 184.723 35.7423Z"
              fill="#162A51"
            />
            <path
              id="Vector_9"
              d="M42.2994 26.1294C40.0106 26.5251 37.5281 27.4794 35.6511 28.6898C30.2259 32.216 27.5859 36.8945 27.5859 43.0044C27.5859 47.0427 28.6758 50.1384 31.1462 53.1875C34.9366 57.8543 40.931 60.4263 46.8163 59.9142C52.1447 59.4604 56.6132 57.0979 59.6648 53.141C61.1907 51.1742 62.0142 49.5449 62.5833 47.3802C63.8427 42.632 62.9951 37.4182 60.343 33.6009C57.6788 29.7488 52.956 26.816 48.2332 26.0829C46.7316 25.8501 43.8373 25.8734 42.2994 26.1294ZM47.0101 37.0225C47.9547 37.2669 49.1899 37.8953 49.9407 38.5238C51.0427 39.4548 51.6845 41.0143 51.6845 42.7949C51.6845 45.4367 50.6188 47.1242 48.1605 48.2996C46.2351 49.2306 44.4791 49.2772 42.6384 48.4393C40.8583 47.6246 39.8169 46.5772 39.3082 45.0992C38.9571 44.0867 38.9449 42.0151 39.2719 40.9445C39.829 39.1057 41.5486 37.5927 43.7283 37.0225C44.576 36.813 46.1382 36.8014 47.0101 37.0225Z"
              fill="#162A51"
            />
            <path
              id="Vector_10"
              d="M81.1718 26.1294C78.6772 26.5484 75.9888 27.6656 73.8574 29.132C70.1518 31.6923 67.7299 35.1488 66.8216 39.1173C66.3494 41.2354 66.313 44.5289 66.7611 46.5423C67.415 49.5681 68.9893 52.3263 71.3991 54.6888C73.3125 56.5741 75.4075 57.9009 77.9748 58.8785C83.1215 60.8453 89.5881 60.1237 94.2988 57.0746C97.0357 55.294 99.4939 52.3845 100.729 49.475C102.594 45.0992 102.425 39.5363 100.293 35.4165C97.8228 30.61 92.6398 26.9441 87.1056 26.0829C85.604 25.8501 82.7097 25.8734 81.1718 26.1294ZM85.8825 37.0225C87.5537 37.4414 89.2369 38.6401 89.8787 39.8505C90.7749 41.5613 90.7749 44.1216 89.8787 45.844C89.1279 47.2522 86.9845 48.6487 85.0954 48.9513C82.9035 49.3121 80.1061 48.1832 78.8709 46.4608C77.6963 44.8199 77.5388 42.0617 78.4955 40.0251C79.0768 38.8264 80.6995 37.6044 82.4433 37.069C83.291 36.8014 84.9379 36.7897 85.8825 37.0225Z"
              fill="#162A51"
            />
            <path
              id="Vector_11"
              d="M213.29 26.1641C211.898 26.3154 209.936 26.7577 208.81 27.1766C207.332 27.7236 206.363 28.3172 205.298 29.3413C203.566 30.9939 202.815 32.9607 202.815 35.8585C202.815 39.3382 203.869 42.1779 205.855 44.0283C206.654 44.7848 207.054 45.0408 208.519 45.7973C210.771 46.9494 212.673 47.543 215.857 48.0783C218.522 48.5205 219.527 48.9861 219.527 49.7658C219.527 50.2546 218.994 50.755 218.304 50.9296C217.456 51.1507 215.676 51.2555 214.707 51.1391C213.544 50.9994 212.152 50.5106 210.565 49.6727C209.052 48.858 207.901 48.4042 206.981 48.2412C206.073 48.0783 205.116 48.2762 204.583 48.73C203.735 49.4399 202.028 52.2447 201.713 53.4085C201.532 54.1067 201.628 54.9563 201.967 55.5731C202.294 56.2132 203.021 56.702 205.055 57.6796C209.512 59.8093 213.678 60.4145 219.176 59.7162C221.634 59.4136 224.31 58.6222 225.775 57.7843C227.713 56.6671 229.154 54.5606 229.784 51.9305C230.099 50.627 230.062 47.5546 229.723 46.2628C229.263 44.4473 228.343 42.8645 227.107 41.7589C225.582 40.374 221.125 38.8145 217.589 38.4189C216.366 38.2792 214.537 37.8835 214.077 37.6624C213.351 37.3016 212.987 36.8128 212.987 36.1611C212.987 35.5327 213.23 35.2417 213.98 34.9391C214.598 34.6831 216.984 34.4969 217.904 34.6249C218.752 34.7413 221.476 35.521 222.881 36.0331C224.274 36.5451 224.758 36.4986 225.678 35.7654C226.998 34.6947 228.1 32.9723 228.427 31.4361C228.682 30.2141 228.415 29.446 227.483 28.771C226.102 27.7818 222.009 26.4667 219.345 26.1525C218.074 26.0012 214.683 26.0128 213.29 26.1641Z"
              fill="#162A51"
            />
            <path
              id="Vector_12"
              d="M4.63584 0.0836951C3.61861 0.22335 2.85569 0.491022 2.27442 0.898348C1.18454 1.65481 0.615377 3.79618 0.930232 5.89101C1.34197 8.591 1.43884 9.99918 1.5115 14.2121C1.58416 19.1582 1.46306 21.6604 0.760695 30.7961C0.179423 38.256 0.106764 39.606 0.0219953 43.0741C-0.123322 48.7417 0.457949 53.2456 1.57205 55.259C2.08066 56.1784 3.37642 57.5051 4.41786 58.1684C8.71685 60.9266 12.919 60.5309 16.7093 57.0047C18.2957 55.5266 19.2887 53.9672 19.7368 52.2331C19.979 51.3603 20.0153 50.918 20.0032 48.893C20.0032 46.2745 19.8337 44.8896 18.9254 40.2228C18.1141 36.0797 17.993 35.2651 17.9688 33.9965C17.9566 33.0189 17.993 32.7746 18.1988 32.4254C18.3442 32.2043 18.5864 31.9948 18.7438 31.9483C18.9133 31.9017 19.7852 31.8668 20.6814 31.8552C26.3124 31.8202 30.1512 30.5634 32.9607 27.8517C35.092 25.8034 36.5089 23.1733 37.2355 19.9612C37.5382 18.588 37.5382 14.8871 37.2355 13.3975C36.9448 11.9893 36.3757 10.2203 35.8671 9.16126C33.8447 4.9367 29.0735 1.46861 23.6483 0.269902C22.6068 0.0371435 22.1709 0.0255056 13.9604 0.00222984C9.23757 -0.00940806 5.03546 0.0255056 4.63584 0.0836951Z"
              fill="#162A51"
            />
            <path
              id="Vector_13"
              d="M20.6682 23.5251C20.7879 26.0054 19.7468 29.8237 15.5565 29.2114C13.414 28.4603 13.4461 26.856 12.9415 25.9025C12.0215 24.1892 9.83797 24.9054 8.24485 24.3399C6.86455 23.8501 6.0943 21.8541 6.42319 20.4758C6.91516 18.4141 9.35097 16.886 11.4966 16.4142C19.389 14.679 20.0106 16.1789 20.6682 23.5251Z"
              fill="#F5F5F5"
            />
            <path
              id="Vector_14"
              d="M11.165 15.2595C12.8398 15.4517 14.4624 13.4761 14.7891 10.8468C15.1158 8.21748 14.0229 5.93021 12.348 5.73801C10.6732 5.54581 9.05069 7.52147 8.724 10.1508C8.3973 12.7801 9.49018 15.0673 11.165 15.2595Z"
              fill="#F5F5F5"
            />
            <path
              id="Vector_15"
              d="M17.3133 13.3158C18.9172 13.8176 20.9099 12.1836 21.7641 9.6661C22.6183 7.14861 22.0106 4.701 20.4068 4.1992C18.8029 3.69741 16.8102 5.33146 15.956 7.84895C15.1017 10.3664 15.7095 12.8141 17.3133 13.3158Z"
              fill="#F5F5F5"
            />
            <path
              id="Vector_16"
              d="M22.0707 15.7736C23.3177 16.8652 25.8327 16.1631 27.6881 14.2055C29.5436 12.2479 30.0368 9.77601 28.7898 8.68445C27.5428 7.59289 25.0278 8.29497 23.1724 10.2526C21.317 12.2102 20.8238 14.6821 22.0707 15.7736Z"
              fill="#F5F5F5"
            />
            <path
              id="Vector_17"
              d="M22.2392 22.9213C23.3163 24.1786 25.8768 23.781 27.9584 22.0331C30.04 20.2852 30.8543 17.849 29.7773 16.5917C28.7003 15.3344 26.1397 15.7321 24.0581 17.48C21.9765 19.2278 21.1622 21.664 22.2392 22.9213Z"
              fill="#F5F5F5"
            />
          </svg>
        </a>

    {User ?<a className="navbar-brand" href="/Dashboard">Go To DashBoard</a>:<button type="button"  className="btn text-white" name="header_login_form_btn" onClick={handleLoginPopUp}>Login</button>}
      </nav>
      <div className="popup-container">
         <NgoLogIn  showPopUp={showPopUp} setShowPopUp={setShowPopUp}/> 

      </div>
    </div>
  );
}
export default Header;