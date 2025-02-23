import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  logoPath: string = "/icons/logo.svg";
  user: firebase.User | null = null;
  dropdownOpen: boolean = false;
  @ViewChild('profileContainer') profileContainer!: ElementRef;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      console.log(this.user)
    });
  }

  loginWithGitHub() {
    this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  openYourGists() {
    const navigationExtras: NavigationExtras = {
      state: {
        data: {
          photoURL: this.user?.photoURL,
          email: this.user?.email,
          displayName: this.user?.displayName          
        }
      }
    };
    this.router.navigate(['/your-gists'], navigationExtras);
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.profileContainer && !this.profileContainer.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }


}
