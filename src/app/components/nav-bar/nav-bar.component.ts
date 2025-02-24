import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { NavigationExtras, Router } from '@angular/router';
import { GistService } from '../../services/gist.service';
import { AuthService } from '../../services/auth.service';

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
    private router: Router,
    private gistService: GistService,
    private authService: AuthService
  ) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      this.authService.setUser(user);
    });
  }

  loginWithGitHub() {
    this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  logout() {
    this.authService.logout();
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

  openSupportPage() {
    window.open('https://support.github.com/', '_blank');
  }

  openGitHubProfile() {
    this.gistService.getGithubUser().subscribe((user) => {
      window.open(user.html_url,  '_blank');
    })
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.profileContainer && !this.profileContainer.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }


}
